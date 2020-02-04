import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

export default function ClaimReturn() {
  const columns = [
    {
      width: 150,
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category > b.category,
    },
    {
      title: '상품명',
      dataIndex: 'itemName',
      key: 'itemName',
      render: text => <a>{text}</a>,
      sorter: (a, b) => a.itemName > b.itemName,
    },
    {
      width: 100,
      title: '정가',
      dataIndex: 'originalPrice',
      key: 'originalPrice',
      sorter: (a, b) => a.originalPrice - b.originalPrice,
    },
    {
      width: 100,
      title: '할인가',
      dataIndex: 'salePrice',
      key: 'salePrice',
      sorter: (a, b) => a.salePrice - b.salePrice,
    },
    {
      width: 100,
      title: '구독 할인',
      dataIndex: 'subscriptionDiscount',
      key: 'subscriptionDiscount',
      render: (num: number) => <span>{num}%</span>,
      sorter: (a, b) => a.subscriptionDiscount - b.subscriptionDiscount,
    },
  ];

  const actions = [
    {
      text: '송장수정',
      onClick: (nums: number[]) => {
        return;
      },
    },
    {
      text: '판매자 직접 반품',
      onClick: num => {
        return;
      },
    },
    {
      text: '판매자 직접 교환',
      onClick: num => {
        return;
      },
    },
  ];

  return (
    <MainLayout>
      <Board
        title="반품 관리"
        subTitle="구매자가 요청한 반품 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
        helpTexts={[
          `판매자께서 직접 반품접수 하고자 하신다면 배송중 주문관리 메뉴에서 처리해주세요.`,
          `반품요청 사유가 구매자 귀책인 경우 반품배송비가 자동 청구되고 판매자 귀책인 경우 청구되지 않습니다.`,
          `수거완료 후 +3영업일 이내 반품처리를 진행하지 않으시면 페널티가 부과되오니 주의해 주세요.`,
        ]}
        {...{columns, actions}}
      />
    </MainLayout>
  );
}
