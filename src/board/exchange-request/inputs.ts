import moment from 'moment';

import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';

export const exchangeRequestInputs = [
  {
    name: 'period',
    defaultValue: {
      type: 'all',
      startDate: moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    },
    labelText: '조회기간',
    select: [
      {name: '결제일', value: 'paid'},
      {name: '교환요청일', value: 'requested'},
      {name: '교환완료일', value: 'confirmed'},
    ],
    Component: Datepicker,
  },
  {
    name: 'status',
    labelText: '주문상태',
    select: [
      {name: '전체', value: null},
      {name: '교환 요청', value: 'EXCHANGE_REQUESTED'},
      {name: '수거 중', value: 'EXCHANGE_PICKING'},
      {name: '수거 완료', value: 'EXCHANGE_PICKED'},
      {name: '교환 완료', value: 'EXCHANGE_CONFIRMED'},
      {name: '교환 거부', value: 'EXCHANGE_REJECTED'},
      {name: '교환 취소', value: 'EXCHANGE_CANCELLED'},
    ],
    Component: Selector,
  },
  {
    name: 'keyword',
    labelText: '상세조건',
    Component: InputBox,
    guideText:
      '수취인명/구매자명/구매자자연락처/구매자이메일/주문번호/상품별주문번호/상품번호/송장번호를 검색할 수 있습니다.',
  },
];
