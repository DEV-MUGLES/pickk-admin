import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import OrderItemBoard from '@src/board/order-items';

export default function OrderItems() {
  return (
    <MainLayout>
      <OrderItemBoard
        title="주문 조회"
        subTitle="모든 주문건을 조회하실 수 있는 통합 주문조회 메뉴입니다."
      />
    </MainLayout>
  );
}
