import {useState, useContext, createContext, ReactNode} from 'react';
import styled from 'styled-components';

import {DataFetchConfig, Filter} from '@src/types';
import {IBoard} from './IBoard';

const BoardContext = createContext<IBoard>(undefined);

export const useBoardContext = () => useContext(BoardContext);

export type BoardStoreProviderProps = {
  children: ReactNode;
  dataFetchConfig: DataFetchConfig;
  parseExcelData?: (data: unknown) => unknown;
};

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

  const submitFilter = () => {
    const temp = {...filter};
    Object.keys(temp).map((key) => {
      if (temp[key] === undefined) {
        delete temp[key];
      }
    });
    setNewFilter(temp);
    refetch(temp ? {[filterName]: temp} : {});
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
        ? data?.[operationName].map((v) => ({...v, key: v.id}))
        : null,
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
