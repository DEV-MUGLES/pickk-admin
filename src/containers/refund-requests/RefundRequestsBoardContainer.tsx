import {useQuery} from '@apollo/client';

import RefundRequestsBoard from '@src/components/refund-requests';

import BoardStoreProvider from '@src/common/contexts/Board';
import {GET_REFUND_REQUESTS} from '@src/common/graphql';
import {refundRequestRecordMapper} from '@src/components/refund-requests/table';

function RefundRequestsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: () => useQuery(GET_REFUND_REQUESTS),
        operationName: 'meSellerRefundRequests',
        filterName: 'refundRequestFilter',
        mapRecord: refundRequestRecordMapper,
      }}>
      <RefundRequestsBoard
        title="반품 관리"
        subTitle="구매자가 요청한 반품 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default RefundRequestsBoardContainer;
