import moment from 'moment';

import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext} from '@src/contexts/Board';
import {useOrderItemTable} from '@src/hooks/table/OrderItem';

import {orderItemInputs} from './inputs';
import {orderItemColumns} from './table';
import {BoardProps} from '../props';
import {parseTable} from './table/data-parser';

function OrderItemBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  return (
    <>
      <Filter title={title} inputs={orderItemInputs} />
      <Space level={2} />
      <Table title={title} columns={orderItemColumns} />
      <Space level={2} />
    </>
  );
}

export default withBoardContext(
  OrderItemBoard,
  {
    status: null,
    lookupDate: 'paid',
    startDate: moment()
      .subtract(1, 'months')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  useOrderItemTable,
  parseTable,
);
