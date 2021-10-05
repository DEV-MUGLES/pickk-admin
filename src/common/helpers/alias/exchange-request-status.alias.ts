import {ExchangeRequestStatus} from '@pickk/common';

export const getExchangeRequestStatusDisplayName = (
  status: ExchangeRequestStatus,
) => {
  if (!status) {
    return '';
  }

  const {Picked, Rejected, Requested, Reshipped, Reshipping} =
    ExchangeRequestStatus;

  return (
    {
      [Picked]: '수거완료',
      [Rejected]: '교환거부',
      [Requested]: '교환요청',
      [Reshipped]: '재배송완료',
      [Reshipping]: '재배송중',
    }[status] || status
  );
};
