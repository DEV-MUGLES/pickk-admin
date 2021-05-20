import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import {Space} from '@src/components/atoms';

import {withBoardContext} from '@src/contexts/Board';

import {BoardProps} from '../props';
import {sellableItemColumns, sellableItemActions} from './table';
import {sellableItemInputs} from './inputs';

import {ITEMS_QUERY} from '@src/operations/Item/query';

function SellableItemsBoard({title}: BoardProps) {
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
  {isSellable: true},
  {
    gql: ITEMS_QUERY.gql,
    dataName: ITEMS_QUERY.dataName,
    filterName: 'itemFilter',
  },
  (v) => v,
);
