import {UpdateSellerReturnAddressInput} from '@pickk/common';
import {FormItemValueType} from '../../../../components/organisms/Form/base';

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
      {
        pattern: /\d{5,6}/g,
        message: '우편번호 형식(5-6자리 숫자)에 맞게 작성해주세요',
      },
    ],
  },
};
