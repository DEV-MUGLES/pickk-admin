import {useQuery} from '@apollo/client';

import ExchangeRequestsBoard from '@src/components/exchange-requests';

import BoardStoreProvider from '@src/common/contexts/Board';
import {GET_EXCHANGE_REQUEST} from '@src/common/graphql/exchange-request.graphql';
import {exchangeRequestRecordMapper} from '@src/components/exchange-requests/table';

function ExchangeRequestsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: () => useQuery(GET_EXCHANGE_REQUEST),
        operationName: 'meSellerExchangeRequests',
        filterName: 'exchangeRequestFilter',
        mapRecord: exchangeRequestRecordMapper,
      }}>
      <ExchangeRequestsBoard
        title="교환 관리"
        subTitle="구매자가 요청한 교환 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default ExchangeRequestsBoardContainer;
