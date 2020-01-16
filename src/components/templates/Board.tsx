import {useState} from 'react';
import styled from 'styled-components';

import {withBoardFilterContext} from '@src/contexts/BoardFilter';

import Header, {BoardHeaderProps} from '../organisms/Board/Header';
import Filter, {BoardFilterProps} from '../organisms/Board/Filter';
import Table, {BoardTableProps} from '../organisms/Board/Table';
import Space from '../atoms/space';

export type BoardProps = BoardHeaderProps &
  BoardTableProps & {
    filter?: Omit<BoardFilterProps, 'onSubmit'>;
  };

function Board(props: BoardProps) {
  const headerProps: BoardHeaderProps = props;
  const tableProps: BoardTableProps = props;

  const [filterParameter, setFilterParameter] = useState({});

  const handleFilterSubmit = filterForm => {
    setFilterParameter(filterForm);
  };

  const filterProps: BoardFilterProps = {
    ...props.filter,
    onSubmit: handleFilterSubmit,
  };

  return (
    <Wrapper>
      <Header {...headerProps} />
      <Space level={2} />
      <Filter {...filterProps} onSubmit={handleFilterSubmit} />
      <Space level={2} />
      <Table {...tableProps} />
      <Space level={2} />
    </Wrapper>
  );
}

export default withBoardFilterContext(Board);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;
