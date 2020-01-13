import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

export default function Products() {
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
      icon: 'delete',
      text: '선택삭제',
      onClick: num => {
        return;
      },
    },
    {
      text: '특정 피커 구독 할인 설정',
      onClick: num => {
        return;
      },
    },
    {
      text: '선택 상품 구독 할인 설정',
      onClick: num => {
        return;
      },
    },
  ];

  return (
    <MainLayout>
      <Board
        title="상품 조회/수정"
        subTitle="등록한 상품을 조회/수정할 수 있는 메뉴입니다."
        helpTexts={[
          `기본적으로 "최근 3개월 이내 신규등록","판매중"의 상품을 우선 노출 해 주고 있으며  판매대기/품절 등 모든 상품을 조회하시려면 "판매상태"를 전체로 체크하여 조회하시면 됩니다.`,
          '상단에 판매상태별 상품 건수 확인이 가능하며, 건수를 클릭 시 상품목록에 등록한 상품이 조회됩니다.',
          `특정 상품의 조회를 원하신다면, "검색어" 기능을 사용해서 상품번호/상품명/제조사명 등 원하시는 유형으로 조회하실 수 있습니다.`,
        ]}
        {...{columns, actions}}
      />
    </MainLayout>
  );
}
