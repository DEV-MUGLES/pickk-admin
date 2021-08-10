import dayjs from 'dayjs';
import {OrderItemClaimStatus, OrderItemStatus} from '@pickk/common';

import InputBox from '@src/components/common/molecules/BoardFilter/input/InputBox';
import Selector from '@src/components/common/molecules/BoardFilter/input/Selector';
import Datepicker from '@src/components/common/molecules/BoardFilter/input/DatePicker';

import {
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
} from '@src/common/helpers/alias';

export const orderItemInputs = [
  {
    name: 'period',
    defaultValue: {
      type: 'all',
      startDate: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
      endDate: dayjs().format('YYYY-MM-DD'),
    },
    labelText: '조회기간',
    select: [
      {name: '결제일', value: 'paidAtBetween'},
      {name: '발주확인일', value: 'shipReadyAtBetween'},
      {name: '발송처리일', value: 'shippingAtBetween'},
      {name: '배송완료일', value: 'shippedAtBetween'},
    ],
    Component: Datepicker,
  },
  {
    name: 'status',
    labelText: '주문상태',
    select: [{name: '전체', value: null}].concat(
      Object.values(OrderItemStatus).map((value) => ({
        name: getOrderItemStatusDisplayName(value),
        value,
      })),
    ),
    Component: Selector,
  },
  {
    name: 'claimStatus',
    labelText: '클레임 상태',
    select: [{name: '전체', value: null}].concat(
      Object.values(OrderItemClaimStatus).map((value) => ({
        name: getOrderItemClaimStatusDisplayName(value),
        value,
      })),
    ),
    Component: Selector,
  },
  {
    name: 'search',
    labelText: '상세조건',
    Component: InputBox,
    guideText:
      '수취인명/구매자명/구매자자연락처/구매자이메일/주문번호/상품별주문번호/상품번호/송장번호를 검색할 수 있습니다.',
  },
];
