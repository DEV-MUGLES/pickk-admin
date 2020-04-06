export const exchangeRequestPreviewData = [
  {
    label: '교환 요청',
    iconType: 'shopping',
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '교환 수거 중',
    iconType: 'check',
    filterValue: {status: 'PICKING'},
  },
  {
    label: '교환 수거 완료',
    iconType: 'check',
    filterValue: {status: 'PICKED'},
  },
  {
    label: '교환 배송 완료',
    iconType: 'shopping',
    filterValue: {status: 'REDELIVERED'},
  },
];
