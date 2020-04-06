import React from 'react';

import MainLayout from '@src/components/templates/MainLayout';
import SettlementBoard from '@src/board/settlements';

export default function Settlements() {
  return (
    <MainLayout>
      <SettlementBoard
        title="정산 내역"
        subTitle="정산 내역을 조회하실 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}
