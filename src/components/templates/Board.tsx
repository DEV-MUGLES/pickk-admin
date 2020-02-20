import {useState} from 'react';
import styled from 'styled-components';

import {getBoardModelByName} from '@src/models/board';
import {BoardModel} from '@src/models/board/products';
import {addCommaToNumber} from '@src/lib/NumberParser';
import {withBoardFilterContext} from '@src/contexts/BoardFilter';
import Header, {BoardHeaderProps} from '../organisms/Board/Header';
import Filter, {BoardFilterProps} from '../organisms/Board/Filter';
import Table, {BoardTableProps} from '../organisms/Board/Table';
import Space from '../atoms/space';
import {useAxios} from '@src/lib/services/Api';

export type BoardProps = BoardHeaderProps & {
  name: string;
  filter?: Omit<BoardFilterProps, 'onSubmit' | 'inputs'>;
  // tslint:disable-next-line: no-any
};

function Board(props: BoardProps) {
  const boardModel = getBoardModelByName(props.name);
  const {loading, error, data} = useAxios(
    'GET',
    BoardModel.getPathByName(props.name),
    {
      brand: 1,
    },
  );
  const {columns, actions, inputs} = boardModel;

  let dataSource = [];
  if (data) {
    dataSource = data.map(item => {
      return {
        ...item,
        itemMinorType: '니트',
        reviewCount: 5,
        totalViewCount: 5,
        salesCount: 5,
      };
    });
  }

  const headerProps: BoardHeaderProps = props;

  const [filterParameter, setFilterParameter] = useState({});

  const handleFilterSubmit = filterForm => {
    setFilterParameter(filterForm);
  };

  const filterProps: BoardFilterProps = {
    ...props.filter,
    inputs,
    onSubmit: handleFilterSubmit,
  };

  const tableProps: BoardTableProps = {
    title: props.title,
    columns,
    dataSource,
    actions,
    loading,
  };

  return (
    <Wrapper>
      <Header {...headerProps} />
      <Space level={2} />
      <Filter {...filterProps} />
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
