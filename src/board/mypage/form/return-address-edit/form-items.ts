import {UpdateSellerReturnAddressInput} from '@pickk/common';
import {FormItemValueType} from '../base';

export const FORM_ITEMS: {
  [Property in keyof UpdateSellerReturnAddressInput]: FormItemValueType;
} = {
  baseAddress: {
    label: '주소',
    rules: [
      {
        required: true,
        message: '주소를 입력해주세요.',
      },
    ],
  },
  detailAddress: {
    label: '상세주소',
    rules: [
      {
        required: true,
        message: '상세주소를 입력해주세요.',
      },
    ],
  },
  postalCode: {
    label: '우편번호',
    rules: [
      {
        required: true,
        message: '우편번호를 입력해주세요.',
      },
    ],
  },
};
