import {BaseFormProps} from '../../../../components/common/organisms/Form/base';

export const FORM_ITEMS: BaseFormProps['FORM_ITEMS'] = {
  businessName: {
    label: '회사명',
    rules: [
      {
        required: true,
        message: '회사명을 입력해주세요.',
      },
    ],
  },
  representativeName: {
    label: '대표자명',
    rules: [
      {
        required: true,
        message: '대표자명을 입력해주세요.',
      },
    ],
  },
  businessCode: {
    label: '사업자등록번호',
    rules: [
      {
        required: true,
        message: '사업자등록번호를 입력해주세요.',
      },
      {
        pattern: /\d{3}-\d{2}-\d{5}/g,
        message: '***-**-***** 형식에 맞춰 작성해주세요',
      },
    ],
  },
  mailOrderBusinessCode: {
    label: '통신판매업번호',
    rules: [
      {
        required: true,
        message: '통신판매업번호를 입력해주세요.',
      },
    ],
  },
  email: {
    label: '이메일',
    rules: [
      {
        required: true,
        message: '이메일을 입력해주세요.',
      },
      {
        pattern:
          /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/g,
        message: '이메일 형식에 맞게 작성해주세요',
      },
    ],
  },
  orderNotiPhoneNumber: {
    label: '주문관련 알림카톡 발송번호',
  },
  csNotiPhoneNumber: {
    label: '문의관련 알림카톡 발송번호 ',
  },
};
