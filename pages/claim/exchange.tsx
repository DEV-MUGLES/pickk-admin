import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

export default function ClaimExchange() {
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
        title="교환 관리"
        subTitle="구매자가 요청한 교환 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
        helpTexts={[
          `판매자께서 직접 교환접수 하고자 하신다면 배송중 주문관리 메뉴에서 처리해주세요.`,
          `교환 재배송 처리는 수거완료 상태일 때만 가능하니 ‘수거완료’ 처리 후 재배송처리를 진행해주세요.`,
          `수거완료 후 +3영업일 이내 교환처리를 진행하지 않으시면 페널티가 부과되오니 주의해 주세요.`,
        ]}
        {...{columns, actions}}
      />
    </MainLayout>
  );
}
