import React from "react";
import MainLayout from "@src/components/templates/MainLayout";
import Board from "@src/components/templates/Board";

export default function DeliverySituation() {
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

  const actions = [
    {
      text: "송장수정",
      onClick: (nums: number[]) => {
        console.log(nums);
      }
    },
    {
      text: "판매자 직접 반품",
      onClick: num => {
        console.log(num);
      }
    },
    {
      text: "판매자 직접 교환",
      onClick: num => {
        console.log(num);
      }
    }
  ];

  return (
    <MainLayout>
      <Board
        title="배송현황 관리"
        subTitle="배송중, 배송완료 진행중인 주문건 및 구매확정 연장된 주문건을 확인하실 수 있는 메뉴입니다."
        helpTexts={[
          `하단 클레임 접수 메뉴를 이용하여 반품/교환 접수하실 수 있습니다.`,
          `배송추적이 불가능한 배송방법(직접전달/퀵서비스/방문수령/배송추적 불가한 택배사) 등 배송완료를 확인할 수 없는 경우 구매자가 구매확정 하거나 자동구매확정 되도록 기다려 주셔야 합니다.`,
          `빠른 구매확정을 원하시면 [구매확정 요청]기능을 통해 구매자에게 안내를 진행해 주세요.`
        ]}
        {...{ columns, actions }}
      />
    </MainLayout>
  );
}
