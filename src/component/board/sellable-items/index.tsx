import {useItems} from '@pickk/common';

import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import {Space} from '@src/components/atoms';

import {withBoardContext} from '@src/contexts/Board';

import {BoardProps} from '../props';
import {sellableItemColumns, sellableItemActions} from './table';
import {sellableItemInputs} from './inputs';

function SellableItemsBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  return (
    <>
      <Filter title={title} inputs={sellableItemInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={sellableItemColumns}
        actions={sellableItemActions}
      />
    </>
  );
}

export default withBoardContext(
  SellableItemsBoard,
  {},
  {
    useTable: useItems,
    dataName: 'items',
  },
  (v) => v,
);
