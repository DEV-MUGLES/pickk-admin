import {OrderItemClaimStatus} from '@pickk/common';

export const getOrderItemClaimStatusDisplayName = (
  status: OrderItemClaimStatus,
) => {
  if (!status) {
    return;
  }

  const {
    CancelRequested,
    Cancelled,
    ExchangeRequested,
    Exchanged,
    RefundRequested,
    Refunded,
  } = OrderItemClaimStatus;

  return (
    {
      [CancelRequested]: '취소요청',
      [Cancelled]: '취소완료',
      [ExchangeRequested]: '교환요청',
      [Exchanged]: '교환완료',
      [RefundRequested]: '환불요청',
      [Refunded]: '환불완료',
    }[status] || status
  );
};
