import Space from '../atoms/space';
import styled from 'styled-components';

import Header, {BoardHeaderProps} from '../organisms/Board/Header';
import Table, {BoardTableProps} from '../organisms/Board/Table';
import Filter from '@src/components/organisms/Board/Filter';

export type BoardProps = BoardHeaderProps & BoardTableProps;

export default function Board(props: BoardProps) {
  const headerProps: BoardHeaderProps = props;
  const tableProps: BoardTableProps = props;

  return (
    <Wrapper>
      <Header {...headerProps} />
      <Space level={2} />
      <Filter/>
      <Space level={2} />
      <Table {...tableProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: transparent;
`;
