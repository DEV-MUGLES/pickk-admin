import InputBox from '@src/components/molecules/BoardFilter/input/InputBox';
import CheckBox from '@src/components/molecules/BoardFilter/input/CheckBox';

export const itemInputs = [
  {
    name: 'name',
    labelText: '상품명',
    Component: InputBox,
  },
  {
    name: 'isReviewed',
    labelText: '리뷰 필터링',
    guideText: '리뷰가 있는 상품만 필터링하여 볼 수 있는 기능입니다.',
    Component: CheckBox,
  },
];
