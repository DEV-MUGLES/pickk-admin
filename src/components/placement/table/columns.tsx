import {Button} from 'antd';

import {orderItemColumns} from '@src/components/order-items/table';
import {stringSorter} from '@src/common/helpers/sorter';

export const placementColumns = [
  ...orderItemColumns.slice(0, 2), // 상품주문번호, 주문번호
  orderItemColumns[3], // 주문상태
  orderItemColumns[2], // 주문일시
  {
    title: '택배사',
    dataIndex: 'courierId',
    key: 'courierId',
    sorter: (a, b) => stringSorter(b.courierId, a.courierId),
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
    render: (value) =>
      value ? (
        <a href={value} target="_blank">
          <Button size="small">배송추적</Button>
        </a>
      ) : null,
    sorter: (a, b) => b.trackingViewUrl - a.trackingViewUrl,
    width: 90,
  },
  ...orderItemColumns.slice(5, 10), // 상품명, 옵션, 수량, 구매자명, 구매자 연락처
  {
    title: '구매자 이메일',
    dataIndex: 'orderBuyerEmail',
    key: 'orderBuyerEmail',
    sorter: (a, b) => stringSorter(b.orderBuyerEmail, a.orderBuyerEmail),
    width: 100,
    ellipsis: true,
  },
  ...orderItemColumns.slice(10),
  {
    title: '수취인 연락처',
    dataIndex: 'orderReceiverPhoneNumber',
    key: 'orderReceiverPhoneNumber',
    sorter: (a, b) =>
      stringSorter(b.orderReceiverPhoneNumber, a.orderReceiverPhoneNumber),
    width: 100,
    ellipsis: true,
  },
  {
    title: '우편번호',
    dataIndex: 'orderReceiverPostalCode',
    key: 'orderReceiverPostalCode',
    sorter: (a, b) =>
      stringSorter(b.orderReceiverPostalCode, a.orderReceiverPostalCode),
    width: 100,
    ellipsis: true,
  },
  {
    title: '배송지 주소',
    dataIndex: 'orderReceiverBaseAddress',
    key: 'orderReceiverBaseAddress',
    sorter: (a, b) =>
      stringSorter(b.orderReceiverBaseAddress, a.orderReceiverBaseAddress),
    width: 100,
    ellipsis: true,
  },
  {
    title: '배송지 상세주소',
    dataIndex: 'orderReceiverDetailAddress',
    key: 'orderReceiverDetailAddress',
    sorter: (a, b) =>
      stringSorter(b.orderReceiverDetailAddress, a.orderReceiverDetailAddress),
    width: 100,
    ellipsis: true,
  },
  {
    title: '배송지 주소 (통합)',
    dataIndex: 'orderReceiverFullAddress',
    key: 'orderReceiverFullAddress',
    sorter: (a, b) =>
      stringSorter(b.orderReceiverFullAddress, a.orderReceiverFullAddress),
    width: 120,
    ellipsis: true,
  },
  // @ TODO 배송메세지
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
