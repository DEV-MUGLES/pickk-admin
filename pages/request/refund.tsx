import React from 'react';
import MainLayout from '@src/components/common/templates/MainLayout';
import RefundRequestBoard from '@src/components/refund-request';

export default function RefundRequests() {
  return (
    <MainLayout>
      반품 관리 - 구매자가 요청한 반품 주문건에 대해 완료/거부처리를 진행하실 수
      있는 메뉴입니다.
    </MainLayout>
  );
}
