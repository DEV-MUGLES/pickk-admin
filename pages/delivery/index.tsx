import React from "react";
import MainLayout from "@src/components/templates/MainLayout";
import Board from "@src/components/templates/Board";

export default function Delivery() {
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
      text: "발주확인",
      onClick: (nums: number[]) => {
        console.log(nums);
      }
    },
    {
      text: "발송처리",
      onClick: num => {
        console.log(num);
      }
    },
    {
      text: "엑셀 일괄발송",
      onClick: num => {
        console.log(num);
      }
    },
    {
      text: "발송지연 안내",
      onClick: num => {
        console.log(num);
      }
    },
    {
      text: "판매취소",
      onClick: num => {
        console.log(num);
      }
    }
  ];

  const footActions = [
    {
      text: "선택건 주문서 출력",
      onClick: num => {
        console.log(num);
      }
    },
    {
      text: "선택건 출고지/옵션별 주문수량 보기",
      onClick: num => {
        console.log(num);
      }
    }
  ];

  return (
    <MainLayout>
      <Board
        title="발주/발송 관리"
        subTitle="신규 주문건 확인 및 발송처리를 진행하실 수 있는 메뉴입니다."
        helpTexts={[
          `결제일로부터 3영업일 이내에 발송처리를 진행하지 않으시면, 페널티가 부과됩니다.`,
          `발송처리가 늦어질 것으로 예상되면 하단에 ‘발송지연 안내’ 버튼을 눌러 발송기한을 입력하셔야 합니다.(1회만 가능)`,
          `택배 이외에 등기/소포/퀵서비스/방문수령/직접전달한 주문도 배송방법 그리드에서 배송정보 입력이 가능합니다.`
        ]}
        {...{ columns, actions, footActions }}
      />
    </MainLayout>
  );
}
