import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import ExchangeRequestBoard from '@src/board/exchange-request';

export default function ExchangeRequests() {
  return (
    <MainLayout>
      <ExchangeRequestBoard
        title="교환 관리"
        subTitle="구매자가 요청한 교환 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}
