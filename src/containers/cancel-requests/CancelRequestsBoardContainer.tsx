import {useQuery} from '@apollo/client';
import {OrderItemClaimStatus} from '@pickk/common';

import BoardStoreProvider from '@src/common/contexts/Board';
import {GET_ORDER_ITEMS} from '@src/common/graphql';
import CancelRequestsBoard from '@src/components/cancel-requests';

function CancelRequestsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: () =>
          useQuery(GET_ORDER_ITEMS, {
            variables: {
              orderItemFilter: {
                claimStatus: OrderItemClaimStatus.Cancelled,
              },
            },
          }),
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
      }}>
      <CancelRequestsBoard
        title="취소 조회"
        subTitle="완료된 취소 주문건들을 조회하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default CancelRequestsBoardContainer;
