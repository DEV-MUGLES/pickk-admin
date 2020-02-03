import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';
import Board from '@src/components/templates/Board';

export default function ClaimReturn() {
  const columns = [
    {
      title: '상품주문번호',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id > b.id,
      fixed: 'left',
    },
    {
      title: '주문번호',
      dataIndex: 'merchantUid',
      key: 'merchantUid',
      sorter: (a, b) => a.merchantUid > b.merchantUid,
      fixed: 'left',
    },
    {
      title: '주문일시',
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: (a, b) => a.createdAt > b.createdAt,
    },
    {
      title: '주문상태',
      dataIndex: 'orderState',
      key: 'orderState',
      sorter: (a, b) => a.orderState > b.orderState,
    },
    {
      title: '반품처리상태',
      dataIndex: 'state',
      key: 'state',
      sorter: (a, b) => a.state > b.state,
    },
    {
      title: '수거상태',
      dataIndex: 'isPickedUp',
      key: 'isPickedUp',
      sorter: (a, b) => a.isPickedUp > b.isPickedUp,
    },
    {
      title: '결제일',
      dataIndex: 'paidAt',
      key: 'paidAt',
      sorter: (a, b) => a.paidAt > b.paidAt,
    },
    {
      title: '반품요청일',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      sorter: (a, b) => a.requestedAt > b.requestedAt,
    },
    {
      title: '반품사유',
      dataIndex: 'refundReason',
      key: 'refundReason',
      sorter: (a, b) => a.refundReason > b.refundReason,
    },
    {
      title: '반품승인일',
      dataIndex: 'approvedAt',
      key: 'approvedAt',
      sorter: (a, b) => a.approvedAt > b.approvedAt,
    },
    {
      title: '반품완료일',
      dataIndex: 'pickedUpAt',
      key: 'pickedUpAt',
      sorter: (a, b) => a.pickedUpAt > b.pickedUpAt,
    },
    {
      title: '반품배송비',
      dataIndex: 'pickUpFee',
      key: 'pickUpFee',
      sorter: (a, b) => a.pickUpFee > b.pickUpFee,
    },
    {
      title: '환불일',
      dataIndex: 'completedAt',
      key: 'completedAt',
      sorter: (a, b) => a.completedAt > b.completedAt,
    },
    {
      title: '자동환불예정일',
      dataIndex: 'dueDate',
      key: 'dueDate',
      sorter: (a, b) => a.dueDate > b.dueDate,
    },
    {
      title: '상품명',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name > b.name,
    },
    {
      title: '색상',
      dataIndex: 'color',
      key: 'color',
      sorter: (a, b) => a.color > b.color,
    },
    {
      title: '사이즈',
      dataIndex: 'size',
      key: 'size',
      sorter: (a, b) => a.size > b.size,
    },
    {
      title: '기타옵션',
      dataIndex: 'options',
      key: 'options',
      sorter: (a, b) => a.options > b.options,
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
    },
    {
      title: '구매자명',
      dataIndex: 'customerName',
      key: 'customerName',
      sorter: (a, b) => a.customerName > b.customerName,
    },
    {
      title: '구매자번호',
      dataIndex: 'customerPhoneNumber',
      key: 'customerPhoneNumber',
      sorter: (a, b) => a.customerPhoneNumber > b.customerPhoneNumber,
    },
    {
      title: '수취인명',
      dataIndex: 'recipientName',
      key: 'recipientName',
      sorter: (a, b) => a.recipientName > b.recipientName,
    },
  ];

  const dataSource = [];
  for (let i = 1; i < 92; ++i) {
    dataSource.push({
      id: 'id',
      merchantUid: 'merchantUid',
      createdAt: `2020/01/0${i % 9 + 1}`,
      orderState: '주문완료',
      state: '배송완료',
      collectState: '수거중',
      paidAt: `2020/01/0${i % 9 + 1}`,
      requestedAt: `2020/01/0${i % 9 + 1}`,
      refundReason: '단순변심',
      approvedAt: `2020/01/0${i % 9 + 1}`,
      pickedUpAt: `2020/01/0${i % 9 + 1}`,
      refundPendingState: '환불보류',
      pickUpFee: '3000',
      completedAt: `2020/01/0${i % 9 + 1}`,
      dueDate: `2020/01/0${i % 9 + 1}`,
      name: '기모 짱짱 맨투맨 (그레이)' + i,
      color: '화이트',
      size: 'L',
      options: '',
      quantity: i % 3,
      customerName: `구매자${i % 10}`,
      customerPhoneNumber: '01012345678',
      recipientName: `수령자${i % 10}`,
    });
  }

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
        {...{columns, dataSource, actions}}
      />
    </MainLayout>
  );
}
