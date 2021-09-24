import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';

import {BoardFilterRowProps} from '@src/components/common/molecules/BoardFilter/BodyRow';

export const inquiryFilterInputs: BoardFilterRowProps[] = [
  {
    name: 'search',
    labelText: '주문상품번호',
    Component: InputBox,
  },
  // @TODO 답변여부(전체, 미답변, 답변완료) 필터 추가
];
