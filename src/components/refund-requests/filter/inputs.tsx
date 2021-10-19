import {Input} from 'antd';

import {DatePicker} from '@components/new-common/molecules';

import {BoardFilterInputType} from '@components/new-common/organisms/board-filter';

export const refundRequestsFilterInputs: BoardFilterInputType[] = [
  {
    name: 'search',
    label: '검색창',
    Component: (props) => <Input {...props} style={{width: '20rem'}} />,
    guideText: '주문번호/운송장번호를 검색할 수 있습니다.',
  },
  {
    name: 'period',
    label: '조회기간',
    Component: (props) => (
      <DatePicker
        {...props}
        lookupOptions={[
          {name: '결제일', value: 'order.paidAtBetween'},
          {name: '반품요청일', value: 'requestedAtBetween'},
        ]}
        defaultQuickButtonValue="oneMonth"
      />
    ),
  },
];
