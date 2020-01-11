import React from "react";
import MainLayout from "@src/components/templates/MainLayout";
import Board from "@src/components/templates/Board";

export default function Order() {
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
        title="주문 조회"
        subTitle="모든 주문건을 조회하실 수 있는 통합 주문조회 메뉴입니다."
        helpTexts={[
          `상세조회 조건을 넣지 않고, 기간으로 조회하시는 경우 최대 1주일 이내에서 조회가 가능합니다.`,
          `주문건을 클릭하시면, 현재 처리 가능한 버튼이 활성화 되며, 버튼을 누르시면 관련 메뉴로 이동됩니다.`
        ]}
        {...{ columns }}
      />
    </MainLayout>
  );
}
