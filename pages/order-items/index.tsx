import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import OrderItemBoard from '@src/board/order-items';

export default function OrderItems() {
  return (
    <MainLayout>
      <OrderItemBoard
        title="주문 조회"
        subTitle="모든 주문건을 조회하실 수 있는 통합 주문조회 메뉴입니다."
        helpTexts={[
          `상세조회 조건을 넣지 않고, 기간으로 조회하시는 경우 최대 1주일 이내에서 조회가 가능합니다.`,
          `주문건을 클릭하시면, 현재 처리 가능한 버튼이 활성화 되며, 버튼을 누르시면 관련 메뉴로 이동됩니다.`,
        ]}
      />
    </MainLayout>
  );
}
