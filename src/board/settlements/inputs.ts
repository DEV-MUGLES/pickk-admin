import moment from 'moment';

import Selector from '@src/components/molecules/BoardFilter/input/Selector';
import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import {range} from '@src/lib/utils';

export const settlementInputs = [
  {
    name: 'expected',
    labelText: '정산예정월',
    select: [
      {name: '전체', value: null},
      ...range(-5, 2)
        .reverse()
        .map((diff) => {
          const target = moment().add(diff, 'M');
          return {
            name: target.format('YYYY년 MM월'),
            value: target.format('YYYY-MM'),
          };
        }),
    ],
    Component: Selector,
    guideText: '해당 월에 정산예정인 주문건만 필터링합니다.',
  },
  {
    name: 'settleStatus',
    labelText: '정산상태',
    select: [
      {name: '전체', value: null},
      {name: '정산됨', value: 'CONFIRMED'},
      {name: '정산 이슈', value: 'ISSUED'},
      {name: '미정산', value: 'PENDING'},
    ],
    Component: Selector,
  },
  {
    name: 'keyword',
    labelText: '통합검색',
    Component: InputBox,
    guideText:
      '수취인명/구매자명/구매자연락처/구매자이메일/주문번호/상품별주문번호/상품번호/송장번호/상품명을 검색할 수 있습니다.',
  },
];
