export const refundRequestPreviewData = [
  {
    label: '반품 요청',
    iconType: 'shopping',
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '반품 수거 중',
    iconType: 'check',
    filterValue: {status: 'PICKING'},
  },
  {
    label: '반품 수거 완료',
    iconType: 'check',
    filterValue: {status: 'PICKED'},
  },
  {
    label: '반품 완료',
    iconType: 'shopping',
    filterValue: {status: 'CONFIRMED'},
  },
];
