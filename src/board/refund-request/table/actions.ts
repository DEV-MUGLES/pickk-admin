import RefundRequestService from '@src/lib/services/RefundRequest';

export const refundRequestActions = [
  {
    text: '수거 완료',
    onClick: (nums: number[]) => RefundRequestService.pick(nums),
  },
  {
    text: '반품 완료',
    onClick: (nums: number[]) => RefundRequestService.confirm(nums),
  },
];
