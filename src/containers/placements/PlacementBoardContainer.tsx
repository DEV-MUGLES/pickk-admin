import {useQuery} from '@apollo/client';

import PlacementBoard from '@src/components/placement';

import BoardStoreProvider from '@src/common/contexts/Board';
import {GET_ORDER_ITEMS} from '@src/common/graphql/order-item.graphql';
import {placementsRecordMapper} from '@src/components/placement/table';

function PlacementBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: () => useQuery(GET_ORDER_ITEMS),
        operationName: 'meSellerOrderItems',
        filterName: 'orderItemFilter',
        mapRecord: placementsRecordMapper,
      }}>
      <PlacementBoard
        title="발주/발송 관리"
        subTitle="신규 주문건 확인 및 발주/발송처리를 진행하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default PlacementBoardContainer;
