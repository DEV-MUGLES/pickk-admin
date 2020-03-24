import {useState, useContext, createContext} from 'react';
import styled from 'styled-components';

import Header, {BoardHeaderProps} from '../components/organisms/Board/Header';

import {BoardProps} from '@src/components/templates/Board/Item';
import {Filter} from '@src/types/Board';
import Space from '@src/components/atoms/space';

const BoardContext = createContext({
  state: {filter: null, newFilter: null, tableData: null, loading: null},
  action: {handleFilterChange: null, submitFilter: null, initFilter: null},
});

export const useBoardContext = () => useContext(BoardContext);

export const withBoardContext = (
  WrappedComponent: React.FunctionComponent<BoardProps>,
  defaultFilter: Filter,
  useTable,
) => (props: BoardProps & BoardHeaderProps) => {
  const [filter, setFilter] = useState(defaultFilter);
  const [newFilter, setNewFilter] = useState(defaultFilter);
  const {loading, data} = useTable([newFilter]);

  const initFilter = () => {
    setFilter({});
  };

  const handleFilterChange = (data: Filter) => {
    setFilter({...filter, ...data});
  };

  const submitFilter = () => {
    setNewFilter(filter);
  };

  const boardStore = {
    state: {filter, newFilter, tableData: data ? data.results : null, loading},
    action: {handleFilterChange, submitFilter, initFilter},
  };

  return (
    <BoardContext.Provider value={boardStore}>
      <BoardWrapper>
        <Space level={2} />
        <Header {...(props as BoardHeaderProps)} />
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
