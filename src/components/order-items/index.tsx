import Header from '../common/organisms/Board/Header';
import Filter from '../common/organisms/Board/Filter';
import Table from '../common/organisms/Board/Table';

import {useBoardContext} from '@src/common/contexts/Board';
import {BoardProps} from '../props';

import {orderItemInputs} from './inputs';
import {orderItemColumns} from './table';

function OrderItemBoard(props: BoardProps) {
  const {state} = useBoardContext();

  return (
    <>
      <Header {...props} />
      <Filter {...props} inputs={orderItemInputs} />
      <Table {...props} columns={orderItemColumns} />
    </>
  );
}

export default OrderItemBoard;
