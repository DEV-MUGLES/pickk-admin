import {Input} from 'antd';

import {TripleSwitch} from '@components/common/molecules';

import {BoardFilterInputType} from '@components/common/organisms/board-filter';

export const inquiriesFilterInputs: BoardFilterInputType[] = [
  {
    name: 'search',
    label: '주문상품번호',
    Component: (props) => <Input {...props} style={{width: '20rem'}} />,
  },
  {
    name: 'isAnswered',
    label: '답변여부',
    Component: (props) => (
      <TripleSwitch {...props} trueText="답변완료" falseText="미답변" />
    ),
  },
];
