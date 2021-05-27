import {UpdateSellerClaimPolicyInput} from '@pickk/common';
import {FormItemValueType} from '../../../../components/organisms/Form/base';

export const FORM_ITEMS: {
  [Property in keyof UpdateSellerClaimPolicyInput]: FormItemValueType;
} = {
  picName: {
    label: '담당자명',
    rules: [
      {
        required: true,
        message: '담당자명을 입력해주세요.',
      },
    ],
  },
  phoneNumber: {
    label: '연락처',
    rules: [
      {
        required: true,
        message: '연락처를 입력해주세요.',
      },
    ],
  },
  fee: {
    label: '편도 배송비',
    type: 'number',
    rules: [
      {
        required: true,
        message: '편도 배송비를 입력해주세요.',
      },
    ],
  },
};
