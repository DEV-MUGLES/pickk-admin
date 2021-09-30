import {ColumnsType} from 'antd/lib/table';

import TrackingViewLink from '@src/components/common/molecules/tracking-view-link';

import {stringSorter} from '@src/common/helpers';

import {orderItemColumns} from '@src/components/order-items/table';

export const placementColumns: ColumnsType<any> = [
  ...orderItemColumns.slice(0, 2), // 주문상품번호, 주문번호
  orderItemColumns[3], // 주문상태
  orderItemColumns[2], // 주문일시
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
    sorter: (a, b) => b.trackCode - a.trackCode,
    width: 120,
    ellipsis: true,
  },
  {
    title: '배송추적',
    dataIndex: 'trackingViewUrl',
    key: 'trackingViewUrl',
    render: (_, record) => (
      <TrackingViewLink
        courierCode={record.courierCode}
        trackCode={record.trackCode}
      />
    ),
    sorter: (a, b) => b.trackingViewUrl - a.trackingViewUrl,
    width: 90,
  },
  ...orderItemColumns.slice(5, 10), // 상품명, 옵션, 수량, 구매자명, 구매자 연락처
  {
    title: '구매자 이메일',
    dataIndex: 'buyerEmail',
    key: 'buyerEmail',
    sorter: (a, b) => stringSorter(b.buyerEmail, a.buyerEmail),
    width: 100,
    ellipsis: true,
  },
  ...orderItemColumns.slice(10),
  {
    title: '수취인 연락처',
    dataIndex: 'receiverPhoneNumber',
    key: 'receiverPhoneNumber',
    sorter: (a, b) =>
      stringSorter(b.receiverPhoneNumber, a.receiverPhoneNumber),
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
    dataIndex: 'receiverBaseAddress',
    key: 'receiverBaseAddress',
    sorter: (a, b) =>
      stringSorter(b.receiverBaseAddress, a.receiverBaseAddress),
    width: 100,
    ellipsis: true,
  },
  {
    title: '배송지 상세주소',
    dataIndex: 'receiverDetailAddress',
    key: 'receiverDetailAddress',
    sorter: (a, b) =>
      stringSorter(b.receiverDetailAddress, a.receiverDetailAddress),
    width: 100,
    ellipsis: true,
  },
  {
    title: '배송지 주소 (통합)',
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
