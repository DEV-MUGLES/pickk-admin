import moment from 'moment';
import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/molecules/BoardFilter/input/DatePicker';
import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';

export const itemInputs = [
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
      {name: '발송처리일', value: 'shipping'},
    ],
    Component: Datepicker,
  },
  {
    name: 'status',
    labelText: '주문상태',
    select: [
      {name: '전체', value: null},
      {name: '결제완료', value: 'PAID'},
      {name: '발주완료', value: 'PLACED'},
      {name: '발송완료', value: 'SHIPPING'},
      {name: '배송완료', value: 'DELIVERED'},
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
