import AccountInput, {
  CheckAccountValidation,
} from '@src/components/organisms/Form/Items/account-input';

import {FormItemValueType} from '@src/components/organisms/Form/base';

export const FORM_ITEMS: {
  [name: string]: FormItemValueType;
} = {
  picName: {
    label: '담당자 이름',
    rules: [{required: true, message: '담당자 이름을 입력해주세요'}],
  },
  phoneNumber: {
    label: '담당자 번호',
    rules: [{required: true, message: '담당자 번호를 입력해주세요'}],
  },
  email: {
    label: '세금계산서 수령이메일',
    rules: [{required: true, message: '수령이메일을 입력해주세요'}],
  },
  accountInput: {
    label: '정산 계좌번호',
    Component: AccountInput,
    rules: [
      {required: true, message: '정산 계좌번호 입력해주세요'},
      {validator: CheckAccountValidation},
    ],
  },
};
