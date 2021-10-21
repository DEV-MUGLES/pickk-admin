import {Input} from 'antd';

import {DatePicker} from '@components/common/molecules';

import {BoardFilterInputType} from '@components/common/organisms/board-filter';

export const orderItemsFilterInputs: BoardFilterInputType[] = [
  {
    name: 'query',
    label: '검색창',
    Component: (props) => <Input {...props} style={{width: '20rem'}} />,
    guideText: '주문번호/주문상품번호/아이템명으로 검색할 수 있습니다.',
  },
  {
    name: 'period',
    label: '조회기간',
    Component: (props) => (
      <DatePicker
        {...props}
        lookupOptions={[
          {name: '결제일', value: 'paidAtBetween'},
          {name: '발주확인일', value: 'shipReadyAtBetween'},
          {name: '발송처리일', value: 'shippingAtBetween'},
          {name: '배송완료일', value: 'shippedAtBetween'},
        ]}
        defaultQuickButtonValue="oneWeek"
      />
    ),
  },
];
