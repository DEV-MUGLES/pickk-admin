import {useState, useContext, createContext, useEffect} from 'react';
import styled from 'styled-components';
import {useQuery} from '@apollo/client';

import Header, {
  BoardHeaderProps,
} from '../../components/organisms/Board/Header';
import {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {BoardProps} from '@src/component/board/props';
import {Filter} from '@src/types/Board';
import {IBoard} from './IBoard';
import {OperationType} from '@src/operations/type';

const BoardContext = createContext<IBoard>(undefined);

export const useBoardContext = () => useContext(BoardContext);

export const withBoardContext =
  (
    WrappedComponent: React.FunctionComponent<BoardProps>,
    defaultFilter: Filter,
    operation: {
      filterName?: string;
    } & Pick<OperationType, 'gql' | 'dataName'>,
    parseExcelData,
  ) =>
  (
    props: BoardProps &
      BoardHeaderProps &
      Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>,
  ) => {
    const [filter, setFilter] = useState(defaultFilter);
    const [newFilter, setNewFilter] = useState(defaultFilter);
    const {gql, dataName, filterName} = operation;
    const result = useQuery(gql, {
      variables: {
        ...(filterName ? {[filterName]: defaultFilter} : {}),
      },
    });
    const {data, loading, refetch} = result;

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    useEffect(() => {
      console.log(result);
    }, [result]);

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
      if (!temp.isReviewed) {
        delete temp.isReviewed;
      }
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
          ? data?.[dataName].map((v) => ({...v, key: v.id}))
          : null,
        loading,
        defaultFilter,
        selectedRowKeys,
      },
      action: {
        handleFilterChange,
        submitFilter,
        initFilter,
        reload,
        applyPreview,
        parseExcelData,
        setSelectedRowKeys,
      },
    };

    return (
      <BoardContext.Provider value={boardStore}>
        <BoardWrapper>
          <Space level={2} />
          <Header {...(props as BoardHeaderProps)} />
          <Space level={2} />
          <WrappedComponent {...(props as BoardProps)} />
          <Space level={2} />
        </BoardWrapper>
      </BoardContext.Provider>
    );
  };

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;
