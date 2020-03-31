export const placementPreviewData = [
  {
    label: '발송 전 취소 요청',
    iconType: 'shopping',
    filterValue: {sumin: 1},
    disabled: true,
  },
  {
    label: '발송 전 배송지 변경',
    iconType: 'check',
    filterValue: {sumin: 2},
    disabled: true,
  },
  {label: '신규 주문', iconType: 'shopping', filterValue: {status: 'PAID'}},
  {
    label: '발주 확인 완료',
    iconType: 'check',
    filterValue: {status: 'PLACED'},
  },
];
