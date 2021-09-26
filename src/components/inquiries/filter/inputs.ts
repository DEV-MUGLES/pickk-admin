import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';

import {TripleSwitch} from '@src/components/common/molecules/BoardFilter/input';

import {BoardFilterRowProps} from '@src/components/common/molecules/BoardFilter/BodyRow';

export const inquiryFilterInputs: BoardFilterRowProps[] = [
  {
    name: 'search',
    labelText: '주문상품번호',
    Component: InputBox,
  },
  {
    name: 'isAnswered',
    labelText: '답변여부',
    Component: TripleSwitch,
    trueText: '답변완료',
    falseText: '미답변',
  },
];
