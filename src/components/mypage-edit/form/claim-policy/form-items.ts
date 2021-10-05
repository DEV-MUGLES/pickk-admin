import {Input} from 'antd';

import AddressInput, {AddressType} from './address-input';

import {BaseFormProps} from '@src/components/common/organisms/Form/base';

const {TextArea} = Input;

const checkAddressValidation = async (
  _,
  {baseAddress, detailAddress, postalCode}: AddressType,
) => {
  if (!baseAddress?.length) {
    throw new Error('주소를 입력해주세요.');
  }

  if (!detailAddress?.length) {
    throw new Error('상세주소를 입력해주세요.');
  }

  if (!postalCode.match(/^\d{5}$/g)) {
    throw new Error('우편번호 형식(5자리 숫자)에 맞게 입력해주세요');
  }

  return;
};

export const FORM_ITEMS: BaseFormProps['FORM_ITEMS'] = {
  returnAddress: {
    label: '반송주소',
    CustomInput: AddressInput,
    rules: [
      {
        required: true,
        message: '주소, 상세주소, 우편번호를 모두 입력해주세요',
      },
      {validator: checkAddressValidation},
    ],
  },
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
  description: {
    label: '교환/반품 문구',
    CustomInput: TextArea,
  },
};
