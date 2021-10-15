import {ExchangeRequestStatus} from '@pickk/common';

import ExchangeRequestsBoard from '@src/components/exchange-requests';

import BoardStoreProvider from '@src/common/contexts/Board';
import {exchangeRequestRecordMapper} from '@src/components/exchange-requests/table';

import {useExchangeRequests} from './hooks';

function ExchangeRequestsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useExchangeRequests,
        operationName: 'meSellerExchangeRequests',
        filterName: 'exchangeRequestFilter',
        mapRecord: exchangeRequestRecordMapper,
        filterRecord: (v) => v.status !== ExchangeRequestStatus.Pending,
      }}>
      <ExchangeRequestsBoard
        title="교환 관리"
        subTitle="구매자가 요청한 교환 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default ExchangeRequestsBoardContainer;
