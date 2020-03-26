import {useState, useContext, createContext} from 'react';
import styled from 'styled-components';

import Header, {BoardHeaderProps} from '../components/organisms/Board/Header';
import {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {BoardProps} from '@src/board/props';
import {Filter} from '@src/types/Board';

const BoardContext = createContext({
  state: {filter: null, newFilter: null, tableData: null, loading: null},
  action: {
    handleFilterChange: null,
    submitFilter: null,
    initFilter: null,
    reload: null,
    applyPreview: null,
    parseExcelData: null,
  },
});

export const useBoardContext = () => useContext(BoardContext);

export const withBoardContext = (
  WrappedComponent: React.FunctionComponent<BoardProps>,
  defaultFilter: Filter,
  useTable,
  parseExcelData,
) => (
  props: BoardProps &
    BoardHeaderProps &
    Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>,
) => {
  const [toRerender, setToRerender] = useState(0);
  const [filter, setFilter] = useState(defaultFilter);
  const [newFilter, setNewFilter] = useState(defaultFilter);
  const {loading, data} = useTable([newFilter, toRerender]);

  const initFilter = () => {
    setFilter(defaultFilter);
    setNewFilter(defaultFilter);
  };

  const handleFilterChange = (data: Filter) => {
    setFilter({...filter, ...data});
  };

  const submitFilter = () => {
    setNewFilter(filter);
  };

  const reload = () => {
    setToRerender(toRerender + 1);
  };

  const applyPreview = data => {
    setFilter(data);
    setNewFilter(data);
  };

  const boardStore = {
    state: {
      filter,
      newFilter,
      tableData: data
        ? data.map(v => {
            return {...v, key: v.id};
          })
        : null,
      loading,
    },
    action: {
      handleFilterChange,
      submitFilter,
      initFilter,
      reload,
      applyPreview,
      parseExcelData,
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