import Header from '../common/organisms/Board/Header';
import Filter from '../common/organisms/Board/Filter';
import Table from '../common/organisms/Board/Table';

import {BoardProps} from '../props';

import {orderItemInputs} from './inputs';
import {orderItemColumns, orderItemExcelColumns} from './table';

function OrderItemBoard(props: BoardProps) {
  return (
    <>
      <Header {...props} />
      <Filter {...props} inputs={orderItemInputs} />
      <Table
        {...props}
        columns={orderItemColumns}
        excelColumns={orderItemExcelColumns}
      />
    </>
  );
}

export default OrderItemBoard;
