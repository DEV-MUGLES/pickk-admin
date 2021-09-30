import {useQuery} from '@apollo/client';
import {OrderItemStatus} from '@pickk/common';

import ShipmentBoard from '@src/components/shipments';

import BoardStoreProvider from '@src/common/contexts/Board';
import {GET_ORDER_ITEMS} from '@src/common/graphql';

function ShipmentsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: () => useQuery(GET_ORDER_ITEMS),
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
        filterRecord: (v) =>
          ([OrderItemStatus.Shipping, OrderItemStatus.Shipped].includes(
            v.status,
          ) ||
            v.isConfirmed === true) &&
          v.claimStatus == null,
      }}>
      <ShipmentBoard
        title="배송현황 관리"
        subTitle="배송중, 배송완료 진행중인 주문건 및 구매확정 연장된 주문건을 확인하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default ShipmentsBoardContainer;
