import {orderItemInputs} from '../deprecated-order-items/inputs';

import CheckBox from '../common/molecules/BoardFilter/input/CheckBox';

export const placementInputs = [
  ...orderItemInputs, // 검색창, 조회기간
  // @TODO 발송지연 안내여부
  // {
  //   name: '',
  //   labelText: '발송지연 안내여부',
  //   Component: CheckBox,
  // },
];
