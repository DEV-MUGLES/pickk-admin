import {RefundRequestStatus} from '@pickk/common';

export const getRefundRequestStatusStatusDisplayName = (
  status: RefundRequestStatus,
) => {
  if (!status) {
    return;
  }

  const {Confirmed, Picked, Rejected, Requested} = RefundRequestStatus;

  return (
    {
      [Confirmed]: '반품완료',
      [Picked]: '수거완료',
      [Rejected]: '반품거부',
      [Requested]: '반품요청',
    }[status] || status
  );
};
