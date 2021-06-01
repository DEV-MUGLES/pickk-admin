import MinimumAmountForFreeInput from './minimum-amount-for-free-input';

import {FormItemValueType} from '../../../../components/organisms/Form/base';
import {UpdateSellerShippingPolicyInput} from '@src/operations/__generated__/globalTypes';

export const FORM_ITEMS: {
  [Property in keyof UpdateSellerShippingPolicyInput]: FormItemValueType;
} = {
  fee: {
    label: '기본 배송비',
    rules: [
      {
        required: true,
        message: '기본 배송비를 입력해주세요.',
      },
    ],
    type: 'number',
  },
  minimumAmountForFree: {
    label: '무료배송',
    Component: MinimumAmountForFreeInput,
    rules: [
      {
        required: true,
        message: '무료배송 최소주문금액을 입력해주세요.',
      },
    ],
  },
};
