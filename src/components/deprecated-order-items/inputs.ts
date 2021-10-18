import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

export const orderItemInputs = [
  {
    name: 'search',
    labelText: '검색창',
    Component: InputBox,
    guideText: '주문번호/주문상품번호/아이템명으로 검색할 수 있습니다.',
  },
  {
    name: 'period',
    labelText: '조회기간',
    select: [
      {name: '결제일', value: 'paidAtBetween'},
      {name: '발주확인일', value: 'shipReadyAtBetween'},
      {name: '발송처리일', value: 'shippingAtBetween'},
      {name: '배송완료일', value: 'shippedAtBetween'},
    ],
    defaultQuickButtonValue: 'oneWeek',
    Component: Datepicker,
  },
];
