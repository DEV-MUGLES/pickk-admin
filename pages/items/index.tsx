import React from 'react';
import MainLayout from '@src/components/common/templates/MainLayout';
import ItemBoard from '@src/component/board/item';

export default function Items() {
  return (
    <MainLayout>
      <ItemBoard
        title="전체상품 관리"
        subTitle="등록된 전체 상품을 조회/수정할 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}
