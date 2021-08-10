import React from 'react';
import MainLayout from '@src/components/common/templates/MainLayout';
import ShipmentBoard from '@src/components/shipments';

export default function OrderItems() {
  return (
    <MainLayout>
      배송현황 관리-배송중, 배송완료 진행중인 주문건 및 구매확정 연장된 주문건을
      확인하실 수 있는 메뉴입니다.
    </MainLayout>
  );
}
