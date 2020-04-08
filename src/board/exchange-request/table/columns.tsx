import {getTimeString} from '@src/lib/DateParser';
import {addDashToPhoneNumber} from '@src/lib/PhoneNumberParser';
import {stringSorter} from '@src/lib/sorter';
import {Button} from 'antd';

export const exchangeRequestColumns = [
  {
    title: '주문번호',
    dataIndex: 'orderMerchantUid',
    key: 'orderMerchantUid',
    sorter: (a, b) => stringSorter(b.orderMerchantUid, a.orderMerchantUid),
    width: 120,
    ellipsis: true,
  },
  {
    title: '상품주문번호',
    dataIndex: 'merchantUid',
    key: 'merchantUid',
    sorter: (a, b) => stringSorter(b.merchantUid, a.merchantUid),
    width: 120,
    ellipsis: true,
  },
  {
    title: '구매자명',
    dataIndex: 'buyerName',
    key: 'buyerName',
    sorter: (a, b) => stringSorter(b.buyerName, a.buyerName),
    width: 100,
    ellipsis: true,
  },
  {
    title: '주문상태',
    dataIndex: 'orderStatus',
    key: 'orderStatus',
    sorter: (a, b) => stringSorter(b.orderStatus, a.orderStatus),
    width: 110,
    ellipsis: true,
  },
  {
    title: '교환 처리상태',
    dataIndex: 'exchangeStatus',
    key: 'exchangeStatus',
    sorter: (a, b) => stringSorter(b.exchangeStatus, a.exchangeStatus),
    width: 110,
    ellipsis: true,
  },
  {
    title: '결제일',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.paidAt, a.paidAt),
    width: 140,
    ellipsis: true,
  },
  {
    title: '교환요청일',
    dataIndex: 'requestedAt',
    key: 'requestedAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.requestedAt, a.requestedAt),
    width: 140,
    ellipsis: true,
  },
  {
    title: '교환완료일',
    dataIndex: 'confirmedAt',
    key: 'confirmedAt',
    render: (value) => <div>{getTimeString(value)}</div>,

    sorter: (a, b) => stringSorter(b.confirmedAt, a.confirmedAt),
    width: 140,
    ellipsis: true,
  },
  {
    title: '교환사유',
    dataIndex: 'reason',
    key: 'reason',
    sorter: (a, b) => stringSorter(b.reason, a.reason),
    width: 200,
    ellipsis: true,
  },
  {
    title: '반품 택배사',
    dataIndex: 'exchangeCourier',
    key: 'exchangeCourier',
    sorter: (a, b) => stringSorter(b.exchangeCourier, a.exchangeCourier),
    width: 90,
    ellipsis: true,
  },
  {
    title: '반품 송장번호',
    dataIndex: 'exchangeTrackingCode',
    key: 'exchangeTrackingCode',
    sorter: (a, b) => b.exchangeTrackingCode - a.exchangeTrackingCode,
    width: 120,
    ellipsis: true,
  },
  {
    title: '반품\n배송추적',
    dataIndex: 'exchangeTrackingViewUrl',
    key: 'exchangeTrackingViewUrl',
    render: (value) =>
      value ? (
        <a href={value} target="_blank">
          <Button size="small">배송추적</Button>
        </a>
      ) : null,
    sorter: (a, b) => b.exchangeTrackingViewUrl - a.exchangeTrackingViewUrl,
    width: 90,
  },
  {
    title: '재배송 택배사',
    dataIndex: 'reshipCourier',
    key: 'reshipCourier',
    sorter: (a, b) => stringSorter(b.reshipCourier, a.reshipCourier),
    width: 90,
    ellipsis: true,
  },
  {
    title: '재배송 송장번호',
    dataIndex: 'reshipTrackingCode',
    key: 'reshipTrackingCode',
    sorter: (a, b) => b.reshipTrackingCode - a.reshipTrackingCode,
    width: 120,
    ellipsis: true,
  },
  {
    title: '재배송\n배송추적',
    dataIndex: 'reshipTrackingViewUrl',
    key: 'reshipTrackingViewUrl',
    render: (value) =>
      value ? (
        <a href={value} target="_blank">
          <Button size="small">배송추적</Button>
        </a>
      ) : null,
    sorter: (a, b) => b.reshipTrackingViewUrl - a.reshipTrackingViewUrl,
    width: 90,
  },
  {
    title: '상품명',
    dataIndex: 'itemName',
    key: 'itemName',
    render: (value) => value,
    sorter: (a, b) => stringSorter(b.itemName, a.itemName),
    width: 200,
    ellipsis: true,
  },
  {
    title: '옵션',
    dataIndex: 'options',
    key: 'options',
    render: (value) => value.join('/'),
    sorter: (a, b) => stringSorter(b.options.join('/'), a.options.join('/')),
    width: 100,
    ellipsis: true,
  },
  {
    title: '상품일련번호',
    dataIndex: 'productSku',
    key: 'productSku',
    sorter: (a, b) => stringSorter(b.productSku, a.productSku),
    width: 120,
    ellipsis: true,
  },
  {
    title: '교환옵션',
    dataIndex: 'exchangeOptions',
    key: 'exchangeOptions',
    render: (value) => value.join('/'),
    sorter: (a, b) =>
      stringSorter(b.exchangeOptions.join('/'), a.exchangeOptions.join('/')),
    width: 100,
    ellipsis: true,
  },
  {
    title: '교환상품일련번호',
    dataIndex: 'exchangeProductSku',
    key: 'exchangeProductSku',
    sorter: (a, b) => stringSorter(b.exchangeProductSku, a.exchangeProductSku),
    width: 120,
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
    title: '구매자 연락처',
    dataIndex: 'buyerPhone',
    key: 'buyerPhone',
    render: (value) => <div>{value ? addDashToPhoneNumber(value) : null}</div>,
    sorter: (a, b) => stringSorter(b.buyerPhone, a.buyerPhone),
    width: 125,
    ellipsis: true,
  },
  {
    title: '수취인명',
    dataIndex: 'addressName',
    key: 'addressName',
    sorter: (a, b) => stringSorter(b.addressName, a.addressName),
    width: 75,
    ellipsis: true,
  },
  {
    title: '수취인 연락처',
    dataIndex: 'addressPhone',
    key: 'addressPhone',
    render: (value) => <div>{value ? addDashToPhoneNumber(value) : null}</div>,
    sorter: (a, b) => stringSorter(b.addressPhone, a.addressPhone),
    width: 125,
    ellipsis: true,
  },
];
