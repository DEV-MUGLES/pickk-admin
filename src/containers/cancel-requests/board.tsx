import {BoardTemplate} from '@components/new-common/template';
import {
  orderItemsColumns,
  orderItemsExcelColumns,
  orderItemsFilterInputs,
} from '@components/order-items';

import {useCancelRequests} from './hooks';

export default function CancelRequestsBoardContainer() {
  return (
    <BoardTemplate
      title="취소 조회"
      subTitle="완료된 취소 주문건들을 조회하실 수 있는 메뉴입니다."
      useBoardData={useCancelRequests}
      columns={orderItemsColumns}
      excelColumns={orderItemsExcelColumns}
      filterInputs={orderItemsFilterInputs}
      keyField="merchantUid"
    />
  );
}
