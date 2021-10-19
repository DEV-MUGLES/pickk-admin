import {ColumnsType} from 'antd/lib/table';

import TrackingViewLink from '@src/components/common/molecules/tracking-view-link';

import {FlattenPlacementDataType} from '@containers/placements/hooks';
import {
  addDashToPhoneNumber,
  getOrderItemStatusDisplayName,
  renderDateWithTime,
  stringSorter,
} from '@src/common/helpers';

export const placementsColumns: ColumnsType<FlattenPlacementDataType> = [
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
    title: '주문 일시',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: renderDateWithTime,
    sorter: (a, b) => stringSorter(b.paidAt, a.paidAt),
    width: 100,
    ellipsis: true,
  },
  {
    title: '택배사',
    dataIndex: 'courierName',
    key: 'courierName',
    sorter: (a, b) => stringSorter(b.courierName, a.courierName),
    width: 90,
    ellipsis: true,
  },
  {
    title: '송장번호',
    dataIndex: 'trackCode',
    key: 'trackCode',
    sorter: (a, b) => stringSorter(b.trackCode, a.trackCode),
    width: 120,
    ellipsis: true,
  },
  {
    title: '배송추적',
    dataIndex: 'trackingViewUrl',
    key: 'trackingViewUrl',
    render: (_, {courierCode, trackCode}) => (
      <TrackingViewLink courierCode={courierCode} trackCode={trackCode} />
    ),
    width: 90,
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
    title: '구매자 이메일',
    dataIndex: 'buyerEmail',
    key: 'buyerEmail',
    sorter: (a, b) => stringSorter(b.buyerEmail, a.buyerEmail),
    width: 100,
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
  {
    title: '수취인 연락처',
    dataIndex: 'receiverPhoneNumber',
    key: 'receiverPhoneNumber',
    sorter: (a, b) =>
      stringSorter(b.receiverPhoneNumber, a.receiverPhoneNumber),
    render: (value) => addDashToPhoneNumber(value),
    width: 100,
    ellipsis: true,
  },
  {
    title: '우편번호',
    dataIndex: 'receiverPostalCode',
    key: 'receiverPostalCode',
    sorter: (a, b) => stringSorter(b.receiverPostalCode, a.receiverPostalCode),
    width: 100,
    ellipsis: true,
  },
  {
    title: '배송지 주소',
    dataIndex: 'receiverFullAddress',
    key: 'receiverFullAddress',
    sorter: (a, b) =>
      stringSorter(b.receiverFullAddress, a.receiverFullAddress),
    width: 120,
    ellipsis: true,
  },
  {
    title: '배송메세지',
    dataIndex: 'receiverMessage',
    key: 'receiverMessage',
    sorter: (a, b) => stringSorter(b.receiverMessage, a.receiverMessage),
    width: 120,
    ellipsis: true,
  },
  {
    title: '판매가격',
    dataIndex: 'itemFinalPrice',
    key: 'itemFinalPrice',
    sorter: (a, b) => stringSorter(b.itemFinalPrice, a.itemFinalPrice),
    width: 120,
    ellipsis: true,
  },
  {
    title: '리뷰어',
    dataIndex: 'recommenderNickname',
    key: 'recommenderNickname',
    sorter: (a, b) =>
      stringSorter(b.recommenderNickname, a.recommenderNickname),
    width: 120,
    ellipsis: true,
  },
];
