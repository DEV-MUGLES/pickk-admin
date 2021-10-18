import {ColumnsType} from 'antd/lib/table';

import {
  addDashToPhoneNumber,
  stringSorter,
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
  renderDateWithTime,
} from '@src/common/helpers';
import {OrderItemDataType} from '@containers/order-items/hooks';

export const orderItemsColumns: ColumnsType<OrderItemDataType> = [
  {
    title: '주문상품번호',
    dataIndex: 'merchantUid',
    key: 'merchantUid',
    sorter: (a, b) => stringSorter(b.merchantUid, a.merchantUid),
    width: 140,
    ellipsis: true,
  },
  {
    title: '주문번호',
    dataIndex: 'orderMerchantUid',
    key: 'orderMerchantUid',
    sorter: (a, b) => stringSorter(b.orderMerchantUid, a.orderMerchantUid),
    width: 120,
    ellipsis: true,
  },
  {
    title: '주문 일시',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: renderDateWithTime,
    sorter: (a, b) => stringSorter(b.paidAt, a.paidAt),
    width: 100,
    ellipsis: true,
  },
  {
    title: '구매확정 일시',
    dataIndex: 'confirmedAt',
    key: 'confirmedAt',
    render: renderDateWithTime,
    sorter: (a, b) => stringSorter(b.confirmedAt, a.confirmedAt),
    width: 100,
    ellipsis: true,
  },
  {
    title: '주문상태',
    dataIndex: 'status',
    key: 'status',
    render: (value, {isConfirmed}) =>
      getOrderItemStatusDisplayName(value, isConfirmed),
    sorter: (a, b) => stringSorter(b.status, a.status),
    width: 90,
    ellipsis: true,
  },
  {
    title: '클레임 상태',
    dataIndex: 'claimStatus',
    key: 'claimStatus',
    render: (value) => getOrderItemClaimStatusDisplayName(value),
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
    render: (_, {order}) => order?.buyer?.name,
    sorter: (a, b) => stringSorter(b.order?.buyer?.name, a.order?.buyer?.name),
    width: 75,
    ellipsis: true,
  },
  {
    title: '구매자 연락처',
    dataIndex: 'buyerPhoneNumber',
    key: 'buyerPhoneNumber',
    render: (_, {order}) => addDashToPhoneNumber(order?.buyer?.phoneNumber),
    width: 75,
    ellipsis: true,
  },
  {
    title: '수취인명',
    dataIndex: 'receiverReceiverName',
    key: 'receiverReceiverName',
    render: (_, {order}) => order?.receiver?.receiverName,
    sorter: (a, b) =>
      stringSorter(
        b.order?.receiver?.receiverName,
        a.order?.receiver?.receiverName,
      ),
    width: 75,
    ellipsis: true,
  },
];
