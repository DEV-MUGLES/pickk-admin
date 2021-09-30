import {useState, useContext, createContext} from 'react';
import styled from 'styled-components';

import {
  removeDashFromNumber,
  parseRecordWithDeepKey,
} from '@src/common/helpers';

import {IBoard} from './IBoard';
import {BoardStoreProviderProps, Filter} from './types';

const BoardContext = createContext<IBoard>(undefined);

export const useBoardContext = () => useContext(BoardContext);

export default function BoardStoreProvider({
  children,
  dataFetchConfig,
  parseExcelData = (v) => v,
}: BoardStoreProviderProps) {
  const {
    useBoardData,
    operationName,
    filterName,
    defaultFilter = {},
    mapRecord = (record) => record,
    filterRecord = (record) => true,
  } = dataFetchConfig;

  const {data, loading, refetch} = useBoardData({
    variables: {
      ...(filterName ? {[filterName]: defaultFilter} : {}),
    },
  });

  const [filter, setFilter] = useState(defaultFilter);
  const [newFilter, setNewFilter] = useState(defaultFilter);

  const [selectedRowId, setSelectedRowId] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);

  const initFilter = () => {
    setFilter(defaultFilter);
    setNewFilter(defaultFilter);
    setSelectedRowKeys([]);
  };

  const handleFilterChange = (data: Filter) => {
    setFilter({...filter, ...data});
  };

  const preprocessSubmittedFilter = (value: Filter) => {
    let result = {};

    // 조회 기간 필터를 형식에 맞게 변경한다.
    const hasDatePeriod =
      value['lookupDate'] && value['startDate'] && value['endDate'];
    result = {
      ...value,
      ...(hasDatePeriod && {
        ...parseRecordWithDeepKey(value['lookupDate'], [
          value['startDate'],
          value['endDate'],
        ]),
      }),
    };

    delete result['lookupDate'];
    delete result['startDate'];
    delete result['endDate'];

    // 검색어가 숫자와 '-'의 조합인 경우 '-' 를 제거한다. (휴대폰 번호)
    result = {
      ...result,
      ...(result['search'] && {search: removeDashFromNumber(result['search'])}),
    };

    return result;
  };

  const submitFilter = () => {
    const temp = {...filter};
    Object.keys(temp).map((key) => {
      if (temp[key] === undefined) {
        delete temp[key];
      }
    });
    setNewFilter(temp);
    refetch(temp ? {[filterName]: preprocessSubmittedFilter(temp)} : {});
    setSelectedRowKeys([]);
  };

  const reload = () => {
    refetch();
    setSelectedRowKeys([]);
  };

  const applyPreview = (data) => {
    const newData = {
      ...defaultFilter,
      ...data,
    };
    setFilter(newData);
    setNewFilter(newData);
    setSelectedRowKeys([]);
  };

  const boardStore: IBoard = {
    state: {
      filter,
      newFilter,
      tableData: data
        ? data?.[operationName]
            .filter((v) => filterRecord(v))
            .map((v) => mapRecord(v))
            .map((v) => ({...v, key: v.id}))
        : [],
      loading,
      defaultFilter,
      selectedRowKeys,
      selectedRowId,
      selectedData: data
        ? data?.[operationName].find(({id}) => id === selectedRowId)
        : null,
    },
    action: {
      handleFilterChange,
      submitFilter,
      initFilter,
      reload,
      applyPreview,
      parseExcelData,
      setSelectedRowKeys,
      setSelectedRowId,
    },
  };

  return (
    <BoardContext.Provider value={boardStore}>
      <BoardWrapper>{children}</BoardWrapper>
    </BoardContext.Provider>
  );
}

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;
