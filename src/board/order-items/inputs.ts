import moment from 'moment';

import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';

export const orderItemInputs = [
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
      {name: '발주확인일', value: 'placed'},
      {name: '발송처리일', value: 'shipped'},
      {name: '배송완료일', value: 'delivered'},
    ],
    Component: Datepicker,
  },
  {
    name: 'status',
    labelText: '주문상태',
    select: [
      {name: '전체', value: null},
      {name: '결제 완료', value: 'PAID'},
      {name: '발송 준비', value: 'PLACED'},
      {name: '발송 완료', value: 'SHIPPING'},
      {name: '배송 완료', value: 'DELIVERED'},
      {name: '취소 요청', value: 'CANCEL_REQUESTED'},
      {name: '취소 완료', value: 'CANCELLED'},
      {name: '교환 요청', value: 'EXCHANGE_REQUESTED'},
      {name: '교환 완료', value: 'EXCHANGED'},
      {name: '반품 요청', value: 'REFUND_REQUESTED'},
      {name: '반품 완료', value: 'REFUNDED'},
      {name: '구매 확정', value: 'CONFIRMED'},
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
