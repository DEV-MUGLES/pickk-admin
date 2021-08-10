import BoardStoreProvider from '@src/common/contexts/Board';
import OrderItemBoard from '@src/components/order-items';

import {useMeSellerOrderItems} from './hooks';

function OrderItemsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useMeSellerOrderItems,
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
      }}>
      <OrderItemBoard
        title="주문 조회"
        subTitle="모든 주문건을 조회하실 수 있는 통합 주문조회 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default OrderItemsBoardContainer;
