import {FormItemValueType} from '@src/components/organisms/Form/base';

export const FORM_ITEMS: {
  [name: string]: FormItemValueType;
} = {
  picName: {
    label: '담당자 이름',
    rules: [
      {
        required: true,
        message: '담당자 이름을 입력해주세요.',
      },
    ],
  },
  phoneNumber: {
    label: '딤당자 번호',
    rules: [
      {
        required: true,
        message: '담당자 번호를 입력해주세요.',
      },
    ],
  },
  fee: {
    label: '교환/반품 배송비',
    type: 'number',
    rules: [
      {
        required: true,
        message: '교환/반품 배송비를 입력해주세요.',
      },
    ],
  },
};
