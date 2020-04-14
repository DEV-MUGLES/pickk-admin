export const settlementPreviewData = [
  {
    label: '정산 완료',
    iconType: 'check',
    filterValue: {settleStatus: 'CONFIRMED'},
  },
  {
    label: '정산 이슈',
    iconType: 'exclamatin',
    filterValue: {settleStatus: 'ISSUED'},
  },
  {
    label: '미정산',
    iconType: 'ellipsis',
    filterValue: {settleStatus: 'PENDING'},
  },
  {
    label: '미정산',
    iconType: 'ellipsis',
    filterValue: {settleStatus: 'PENDING'},
    disabled: true,
  },
  {
    label: '미정산',
    iconType: 'ellipsis',
    filterValue: {settleStatus: 'PENDING'},
    disabled: true,
  },
  {
    label: '미정산',
    iconType: 'ellipsis',
    filterValue: {settleStatus: 'PENDING'},
    disabled: true,
  },
];
