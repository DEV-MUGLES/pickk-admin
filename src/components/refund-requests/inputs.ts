import dayjs from 'dayjs';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

export const refundRequestInputs = [
  {
    name: 'search',
    labelText: '검색창',
    Component: InputBox,
    guideText:
      '수취인명/구매자명/구매자자연락처/상품명/주문번호/상품별주문번호/송장번호를 검색할 수 있습니다.',
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
      // @TODO : order.paidAtBetween 이런경우 필터적용 어떻게 해야하나??
      {name: '결제일', value: 'order.paidAtBetween'},
      {name: '반품요청일', value: 'requestedAtBetween'},
    ],
    Component: Datepicker,
  },
];
