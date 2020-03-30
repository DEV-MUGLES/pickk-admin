import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import PlacementBoard from '@src/board/placement';

export default function Placements() {
  return (
    <MainLayout>
      <PlacementBoard
        title="발주/발송 관리"
        subTitle="신규 주문건 확인 및 발주/발송처리를 진행하실 수 있는 메뉴입니다."
      />
    </MainLayout>
  );
}
