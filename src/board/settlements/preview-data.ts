import {
  CheckOutlined,
  EllipsisOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
import moment from 'moment';

export const settlementCountPreviewData = [
  {
    label: '이번달 정산완료',
    icon: CheckOutlined,
    filterValue: {
      expected: moment().format('YYYY-MM'),
      settleStatus: 'CONFIRMED',
    },
  },
  {
    label: '이번달 정산이슈',
    icon: ExclamationOutlined,
    filterValue: {
      expected: moment().format('YYYY-MM'),
      settleStatus: 'ISSUED',
    },
  },
  {
    label: '전체기간 미정산',
    icon: EllipsisOutlined,
    filterValue: {
      expected: null,
      settleStatus: 'PENDING',
    },
  },
];
