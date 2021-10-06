import {BaseFormProps} from '@src/components/common/organisms/Form/base';

export const FORM_ITEMS: BaseFormProps['FORM_ITEMS'] = {
  originalPrice: {
    label: '정가 (단위: 원)',
    type: 'number',
    rules: [{required: true, message: '정가를 입력해주세요'}],
  },
  sellPrice: {
    label: '판매가 (단위: 원)',
    type: 'number',
    rules: [{required: true, message: '판매가를 입력해주세요'}],
  },
  // pickkDiscountRate: {
  //   label: '쿠폰 적용률 (단위: %, 0~100만 입력가능)',
  //   type: 'number',
  //   rules: [{required: true, message: '쿠폰 적용률를 입력해주세요'}],
  // },
};
