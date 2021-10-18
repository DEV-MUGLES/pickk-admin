import {OrderItemStatus} from '@pickk/common';

import OrderItemBoard from '@components/deprecated-order-items';

import BoardStoreProvider from '@src/common/contexts/Board';
import {orderItemsRecordMapper} from '@components/deprecated-order-items/table';

import {useOrderItems} from './hooks';

function OrderItemsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useOrderItems,
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
        mapRecord: orderItemsRecordMapper,
        filterRecord: (v) =>
          ![OrderItemStatus.Pending, OrderItemStatus.Failed].includes(v.status),
      }}>
      <OrderItemBoard
        title="주문 조회"
        subTitle="모든 주문건을 조회하실 수 있는 통합 주문조회 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default OrderItemsBoardContainer;
