import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import ItemBoard from '@src/board/item';

export default function Items() {
  return (
    <MainLayout>
      <ItemBoard
        title="상품 조회/수정"
        subTitle="등록된 상품을 조회/수정할 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}
