import ShippingFeeInput from './fee-input';

import {FormItemValueType} from '../../../../components/organisms/Form/base';

export const FORM_ITEMS: {
  [number: string]: FormItemValueType;
} = {
  shippingPolicy: {
    label: '무료배송',
    Component: ShippingFeeInput,
    rules: [
      {
        required: true,
        message: '무료배송 최소주문금액을 입력해주세요.',
      },
    ],
  },
};
