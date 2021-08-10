import dayjs from 'dayjs';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Selector from '@src/components/common/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

export const cancelRequestInputs = [
  {
    name: 'period',
    defaultValue: {
      type: 'all',
      startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    labelText: '조회기간',
    select: [
      {name: '결제일', value: 'paid'},
      {name: '취소요청일', value: 'requested'},
      {name: '취소완료일', value: 'confirmed'},
    ],
    Component: Datepicker,
  },
  {
    name: 'status',
    labelText: '주문상태',
    select: [
      {name: '전체', value: null},
      {name: '취소 요청', value: 'REQUESTED'},
      {name: '취소 완료', value: 'CONFIRMED'},
      {name: '취소 거부', value: 'REJECTED'},
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
