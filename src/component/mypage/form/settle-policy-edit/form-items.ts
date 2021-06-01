import {FormItemValueType} from '@src/components/organisms/Form/base';
import AccountInput from '@src/components/organisms/Form/Items/account-input';

export const FORM_ITEMS: {
  [name: string]: FormItemValueType;
} = {
  picName: {
    label: '담당자 이름',
  },
  phoneNumber: {
    label: '담당자 번호',
  },
  email: {
    label: '세금계산서 수령이메일',
  },
  accountInput: {
    label: '정산 계좌번호',
    Component: AccountInput,
  },
};
