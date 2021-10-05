import {Input} from 'antd';

import ShippingFeeInput from './fee-input';

import {BaseFormProps} from '../../../common/organisms/Form/base';

const {TextArea} = Input;

export const FORM_ITEMS: BaseFormProps['FORM_ITEMS'] = {
  shippingPolicy: {
    label: '무료배송',
    CustomInput: ShippingFeeInput,
    rules: [
      {
        required: true,
        message: '무료배송 최소주문금액을 입력해주세요.',
      },
    ],
  },
  description: {
    label: '배송정책 문구',
    CustomInput: TextArea,
  },
};
