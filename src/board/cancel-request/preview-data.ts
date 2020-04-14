export const canceldRequestPreviewData = [
  {
    label: '취소 요청',
    iconType: 'unordered-list',
    filterValue: {status: 'REQUESTED'},
  },
  {
    label: '취소 완료',
    iconType: 'check',
    filterValue: {status: 'CONFIRMED'},
  },
  {
    label: '취소 실패',
    iconType: 'close',
    filterValue: {status: 'CONFIRMED'},
    disabled: true,
  },
  {
    label: '취소 거부',
    iconType: 'close',
    filterValue: {status: 'REJECTED'},
  },
];
