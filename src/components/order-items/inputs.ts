import dayjs from 'dayjs';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

export const orderItemInputs = [
  {
    name: 'search',
    labelText: '검색창',
    Component: InputBox,
    guideText:
      '수취인명/구매자명/구매자자연락처/상품명/상품주문번호를 검색할 수 있습니다.',
  },
  {
    name: 'period',
    defaultValue: {
      type: 'all',
      startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    labelText: '조회기간',
    select: [
      {name: '결제일', value: 'paidAtBetween'},
      {name: '발주확인일', value: 'shipReadyAtBetween'},
      {name: '발송처리일', value: 'shippingAtBetween'},
      {name: '배송완료일', value: 'shippedAtBetween'},
    ],
    Component: Datepicker,
  },
];
