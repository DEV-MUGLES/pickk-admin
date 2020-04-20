import moment from 'moment';

export const settlementCountPreviewData = [
  {
    label: '이번달 정산완료',
    iconType: 'check',
    filterValue: {
      expected: moment().format('YYYY-MM'),
      settleStatus: 'CONFIRMED',
    },
  },
  {
    label: '이번달 정산이슈',
    iconType: 'exclamatin',
    filterValue: {
      expected: moment().format('YYYY-MM'),
      settleStatus: 'ISSUED',
    },
  },
  {
    label: '전체기간 미정산',
    iconType: 'ellipsis',
    filterValue: {
      expected: null,
      settleStatus: 'PENDING',
    },
  },
];
