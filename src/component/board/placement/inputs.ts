import {orderItemInputs} from '../order-items/inputs';

import Selector from '@src/components/molecules/BoardFilter/input/Selector';

export const placementInputs = [
  orderItemInputs[0],
  {
    name: 'status',
    labelText: '주문상태',
    select: [
      {name: '결제완료', value: 'PAID'},
      {name: '발송준비', value: 'PLACED'},
      {name: '발송완료', value: 'SHIPPING'},
      {name: '배송완료', value: 'DELIVERED'},
      {name: '전체', value: null},
    ],
    Component: Selector,
  },
  orderItemInputs[2],
];
