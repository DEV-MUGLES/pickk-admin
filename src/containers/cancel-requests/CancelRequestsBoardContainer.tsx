import {OrderItemClaimStatus} from '@pickk/common';

import BoardStoreProvider from '@src/common/contexts/Board';
import CancelRequestsBoard from '@src/components/cancel-requests';

import {useOrderItems} from '../deprecated-order-items/hooks';

function CancelRequestsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useOrderItems,
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
        filterRecord: (v) =>
          [
            OrderItemClaimStatus.Cancelled,
            OrderItemClaimStatus.CancelRequested,
          ].includes(v.claimStatus),
      }}>
      <CancelRequestsBoard
        title="취소 조회"
        subTitle="완료된 취소 주문건들을 조회하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default CancelRequestsBoardContainer;
