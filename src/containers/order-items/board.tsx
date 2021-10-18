import {BoardTemplate} from '@components/new-common/template';
import {
  orderItemsColumns,
  orderItemsExcelColumns,
  orderItemsFilterInputs,
} from '@components/order-items';

import {useOrderItems} from './hooks';

export default function OrderItemsBoardContainer() {
  return (
    <BoardTemplate
      title="주문 조회"
      subTitle="모든 주문건을 조회하실 수 있는 통합 주문조회 메뉴입니다."
      useBoardData={useOrderItems}
      columns={orderItemsColumns}
      excelColumns={orderItemsExcelColumns}
      filterInputs={orderItemsFilterInputs}
    />
  );
}
