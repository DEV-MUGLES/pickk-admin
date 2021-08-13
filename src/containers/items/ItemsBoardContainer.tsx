import React from 'react';
import ItemsBoard from '@src/components/items';

import BoardStoreProvider from '@src/common/contexts/Board';
import {useItems} from '@src/common/hooks/apis';

function ItemsBoardContainer() {
  return (
    <BoardStoreProvider
      dataFetchConfig={{
        useBoardData: useItems,
        operationName: 'items',
        filterName: 'itemFilter',
      }}>
      <ItemsBoard
        title="전체상품 관리"
        subTitle="등록된 전체 상품을 조회/수정할 수 있는 메뉴입니다."
      />
    </BoardStoreProvider>
  );
}

export default ItemsBoardContainer;
