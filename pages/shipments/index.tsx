import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import ShipmentBoard from '@src/board/shipments';

export default function OrderItems() {
  return (
    <MainLayout>
      <ShipmentBoard
        title="배송현황 관리"
        subTitle="배송중, 배송완료 진행중인 주문건 및 구매확정 연장된 주문건을 확인하실 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}
