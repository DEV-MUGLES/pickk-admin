import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import PlacementBoard from '@src/board/placement';

export default function Items() {
  return (
    <MainLayout>
      <PlacementBoard
        title="발주/발송 관리"
        subTitle="신규 주문건 확인 및 발송처리를 진행하실 수 있는 메뉴입니다."
        helpTexts={[
          `결제일로부터 3영업일 이내에 발송처리를 진행하지 않으시면, 페널티가 부과됩니다.`,
          `발송처리가 늦어질 것으로 예상되면 하단에 ‘발송지연 안내’ 버튼을 눌러 발송기한을 입력하셔야 합니다.(1회만 가능)`,
          `택배 이외에 등기/소포/퀵서비스/방문수령/직접전달한 주문도 배송방법 그리드에서 배송정보 입력이 가능합니다.`,
        ]}
      />
    </MainLayout>
  );
}
