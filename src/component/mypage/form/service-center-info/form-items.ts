import {BaseFormProps} from '@src/components/organisms/Form/base';

export const FORM_ITEMS: BaseFormProps['FORM_ITEMS'] = {
  phoneNumber: {
    label: '고객센터 전화번호',
    rules: [
      {
        required: true,
        message: '고객센터번호를 입력해주세요.',
      },
    ],
  },
  operationTimeMessage: {
    label: '고객센터 운영시간',
    rules: [
      {
        required: true,
        message: '고객센터 운영시간을 입력해주세요.',
      },
    ],
  },
  kakaoTalkCode: {
    label: '고객센터 카카오톡 ID',
  },
};
