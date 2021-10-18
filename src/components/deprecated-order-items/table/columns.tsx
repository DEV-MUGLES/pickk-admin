import {ColumnsType} from 'antd/lib/table';

import {
  getTimeString,
  addDashToPhoneNumber,
  stringSorter,
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
} from '@src/common/helpers';

export const orderItemColumns: ColumnsType<any> = [
  {
    title: '주문상품번호',
    dataIndex: 'merchantUid',
    key: 'merchantUid',
    sorter: (a, b) => b.merchantUid - a.merchantUid,
    width: 140,
    ellipsis: true,
  },
  {
    title: '주문번호',
    dataIndex: 'orderMerchantUid',
    key: 'orderMerchantUid',
    sorter: (a, b) => b.orderMerchantUid - a.orderMerchantUid,
    width: 120,
    ellipsis: true,
  },
  {
    title: '주문 일시',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.paidAt, a.paidAt),
    defaultSortOrder: 'ascend',
    width: 100,
    ellipsis: true,
  },
  {
    title: '구매확정 일시',
    dataIndex: 'confirmedAt',
    key: 'confirmedAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.confirmedAt, a.confirmedAt),
    defaultSortOrder: 'ascend',
    width: 100,
    ellipsis: true,
  },
  {
    title: '주문상태',
    dataIndex: 'status',
    key: 'status',
    render: (value, {isConfirmed}) => (
      <div>{getOrderItemStatusDisplayName(value, isConfirmed)}</div>
    ),
    sorter: (a, b) => stringSorter(b.status, a.status),
    width: 90,
    ellipsis: true,
  },
  {
    title: '클레임 상태',
    dataIndex: 'claimStatus',
    key: 'claimStatus',
    render: (value) => <div>{getOrderItemClaimStatusDisplayName(value)}</div>,
    sorter: (a, b) => stringSorter(b.claimStatus, a.claimStatus),
    width: 140,
    ellipsis: true,
  },
  {
    title: '상품명',
    dataIndex: 'itemName',
    key: 'itemName',
    render: (value, record) => (
      <a
        href={`https://pickk.one/item/${record.itemId}`}
        target="_blank"
        rel="noreferrer">
        {value}
      </a>
    ),
    sorter: (a, b) => stringSorter(b.itemName, a.itemName),
    width: 200,
    ellipsis: true,
  },
  {
    title: '옵션',
    dataIndex: 'productVariantName',
    key: 'productVariantName',
    sorter: (a, b) => stringSorter(b.productVariantName, a.productVariantName),
    width: 200,
    ellipsis: true,
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: (a, b) => b.quantity - a.quantity,
    width: 75,
    ellipsis: true,
  },
  {
    title: '구매자명',
    dataIndex: 'buyerName',
    key: 'buyerName',
    sorter: (a, b) => stringSorter(b.buyerName, a.buyerName),
    width: 75,
    ellipsis: true,
  },
  {
    title: '구매자 연락처',
    dataIndex: 'buyerPhoneNumber',
    key: 'buyerPhoneNumber',
    render: (value) => addDashToPhoneNumber(value),
    width: 75,
    ellipsis: true,
  },
  {
    title: '수취인명',
    dataIndex: 'receiverReceiverName',
    key: 'receiverReceiverName',
    sorter: (a, b) =>
      stringSorter(b.receiverReceiverName, a.receiverReceiverName),
    width: 75,
    ellipsis: true,
  },
];
