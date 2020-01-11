import React from "react";
import MainLayout from "@src/components/templates/MainLayout";
import Board from "@src/components/templates/Board";

export default function SettleDetail() {
  const columns = [
    {
      width: 150,
      title: "카테고리",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category > b.category
    },
    {
      title: "상품명",
      dataIndex: "itemName",
      key: "itemName",
      render: text => <a>{text}</a>,
      sorter: (a, b) => a.itemName > b.itemName
    },
    {
      width: 100,
      title: "정가",
      dataIndex: "originalPrice",
      key: "originalPrice",
      sorter: (a, b) => a.originalPrice - b.originalPrice
    },
    {
      width: 100,
      title: "할인가",
      dataIndex: "salePrice",
      key: "salePrice",
      sorter: (a, b) => a.salePrice - b.salePrice
    },
    {
      width: 100,
      title: "구독 할인",
      dataIndex: "subscriptionDiscount",
      key: "subscriptionDiscount",
      render: (number: number) => <span>{number}%</span>,
      sorter: (a, b) => a.subscriptionDiscount - b.subscriptionDiscount
    }
  ];

  return (
    <MainLayout>
      <Board
        title="정산 내역 상세보기"
        helpTexts={[
          `결제대금은 구매확정된 상품주문번호별로 정산주기에 맞춰 정산됩니다.`,
          `구매확정 : 구매자가 상품을 수령한 날 이후 판매자에게 구매대금을 정산해도 된다는 의사표시입니다.`,
          `정산주기 : 판매자님이 정산대금을 받는 주기로, 구매확정일 +1영업일 입니다.`
        ]}
        {...{ columns }}
      />
    </MainLayout>
  );
}
