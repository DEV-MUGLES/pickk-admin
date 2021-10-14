import {OrderItemStatus} from '@pickk/common';

export const getOrderItemStatusDisplayName = (
  status: OrderItemStatus,
  isConfirmed: boolean,
) => {
  if (!status) {
    return;
  }

  if (isConfirmed) {
    return '구매확정';
  }

  const {
    Pending,
    Failed,
    VbankReady,
    VbankDodged,
    Paid,
    ShipPending,
    ShipReady,
    Shipped,
    Shipping,
  } = OrderItemStatus;

  return (
    {
      [Pending]: '결제대기',
      [Failed]: '결제취소',
      [VbankReady]: '입금대기',
      [VbankDodged]: '입금전취소',
      [Paid]: '결제완료',
      [ShipPending]: '배송예약중',
      [ShipReady]: '배송준비중',
      [Shipping]: '배송중',
      [Shipped]: '배송완료',
    }[status] || status
  );
};
