import SellableItemsBoard from '@src/components/sellable-items';

import BoardStoreProvider from '@src/common/contexts/Board';

import {useMeSellerSellableItems} from './hooks';

function SellableItemsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useMeSellerSellableItems,
        operationName: 'meSellerItems',
        filterName: 'itemFilter',
        filterRecord: (v) => !!v.isSellable,
      }}>
      <SellableItemsBoard
        title="활성상품 관리"
        subTitle="판매 가능한 상품을 관리할 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default SellableItemsBoardContainer;
