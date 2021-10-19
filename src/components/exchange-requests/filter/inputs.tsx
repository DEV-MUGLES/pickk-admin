import {Input} from 'antd';

import {DatePicker} from '@components/new-common/molecules';

import {BoardFilterInputType} from '@components/new-common/organisms/board-filter';

export const exchangeRequestsFilterInputs: BoardFilterInputType[] = [
  {
    name: 'search',
    label: '상세조건',
    Component: (props) => <Input {...props} style={{width: '20rem'}} />,
    guideText:
      '수취인명/구매자명/구매자자연락처/상품명/주문번호/주문상품번호/송장번호를 검색할 수 있습니다.',
  },
  {
    name: 'period',
    label: '조회기간',
    Component: (props) => (
      <DatePicker
        {...props}
        lookupOptions={[
          {name: '결제일', value: 'orderItem.paidAtBetween'},
          {name: '교환요청일', value: 'requestedAtBetween'},
        ]}
        defaultQuickButtonValue="oneMonth"
      />
    ),
  },
];
