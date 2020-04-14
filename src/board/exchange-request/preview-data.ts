export const exchangeRequestPreviewData = [
  {
    label: '교환 요청',
    iconType: 'unordered-list',
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '교환 수거 중',
    iconType: 'loading',
    filterValue: {status: 'PICKING'},
  },
  {
    label: '교환 수거 완료',
    iconType: 'import',
    filterValue: {status: 'PICKED'},
  },
  {
    label: '교환 배송 중',
    iconType: 'car',
    filterValue: {status: 'RESHIPPING'},
  },
  {
    label: '교환 배송 완료',
    iconType: 'shopping',
    filterValue: {status: 'REDELIVERED'},
  },
  {
    label: '교환 취소',
    iconType: 'stop',
    filterValue: {status: 'CANCELLED'},
    disabled: true,
  },
  {
    label: '교환 거부',
    iconType: 'close',
    filterValue: {status: 'REJECTED'},
    disabled: true,
  },
];
