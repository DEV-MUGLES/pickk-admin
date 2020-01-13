import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

export default function ClaimCancel() {
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
        title="취소 관리"
        subTitle="구매자가 요청한 취소 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
        helpTexts={[
          `발송전 주문건을 취소하고자 하신다면 발주/발송관리 메뉴에서, 구매확정 완료된 주문건을 취소하고자 하신다면 구매확정 내역 메뉴에서 취소처리가 가능합니다.`,
        ]}
        {...{columns, actions}}
      />
    </MainLayout>
  );
}
