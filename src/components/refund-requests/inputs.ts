import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

export const refundRequestInputs = [
  {
    name: 'search',
    labelText: '검색창',
    Component: InputBox,
    guideText: '주문번호/운송장번호를 검색할 수 있습니다.',
  },
  {
    name: 'period',
    labelText: '조회기간',
    select: [
      {name: '결제일', value: 'order.paidAtBetween'},
      {name: '반품요청일', value: 'requestedAtBetween'},
    ],
    defaultQuickButtonValue: 'oneMonth',
    Component: Datepicker,
  },
];
