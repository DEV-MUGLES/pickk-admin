import dayjs from 'dayjs';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

export const exchangeRequestInputs = [
  {
    name: 'search',
    labelText: '상세조건',
    Component: InputBox,
    guideText:
      '수취인명/구매자명/구매자자연락처/상품명/주문번호/주문상품번호/송장번호를 검색할 수 있습니다.',
  },
  {
    name: 'period',
    labelText: '조회기간',
    select: [
      // @TODO : orderItem.paidAtBetween 필터적용
      {name: '결제일', value: 'orderItem.paidAtBetween'},
      {name: '교환요청일', value: 'requestedAtBetween'},
    ],
    defaultQuickButtonValue: 'oneMonth',
    Component: Datepicker,
  },
];
