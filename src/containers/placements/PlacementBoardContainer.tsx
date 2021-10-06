import {OrderItemStatus} from '@pickk/common';

import PlacementBoard from '@src/components/placements';

import BoardStoreProvider from '@src/common/contexts/Board';
import {placementsRecordMapper} from '@src/components/placements/table';

import {useOrderItems} from '../order-items/hooks';

function PlacementBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useOrderItems,
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
        mapRecord: placementsRecordMapper,
        filterRecord: (v) =>
          [OrderItemStatus.Paid, OrderItemStatus.ShipReady].includes(
            v.status,
          ) && v.claimStatus == null,
      }}>
      <PlacementBoard
        title="발주/발송 관리"
        subTitle="신규 주문건 확인 및 발주/발송처리를 진행하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default PlacementBoardContainer;
