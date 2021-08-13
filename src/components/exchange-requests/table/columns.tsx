import {ColumnsType} from 'antd/lib/table';

import {BaseExchangeRequest} from '@src/common/graphql';
import {addCommaToNumber, getTimeString} from '@src/common/helpers';
import {addDashToPhoneNumber} from '@src/common/helpers/PhoneNumberParser';
import {stringSorter} from '@src/common/helpers/sorter';

export const exchangeRequestColumns: ColumnsType<any> = [
  {
    title: '주문상품번호',
    dataIndex: 'merchantUid',
    key: 'merchantUid',
    sorter: (a, b) => stringSorter(b.merchantUid, a.merchantUid),
    width: 100,
    ellipsis: true,
  },
  {
    title: '주문번호',
    dataIndex: 'orderMerchantUid',
    key: 'orderMerchantUid',
    sorter: (a, b) => stringSorter(b.orderMerchantUid, a.orderMerchantUid),
    width: 100,
    ellipsis: true,
  },
  {
    title: '교환처리상태',
    dataIndex: 'status',
    key: 'status',
    sorter: (a, b) => stringSorter(b.status, a.status),
    width: 100,
    ellipsis: true,
  },
  {
    title: '교환요청일시',
    dataIndex: 'requestedAt',
    key: 'requestedAt',
    render: (value) => getTimeString(value),
    sorter: (a, b) => stringSorter(b.requestedAt, a.requestedAt),
    defaultSortOrder: 'ascend',
    width: 100,
    ellipsis: true,
  },
  {
    title: '상품명',
    dataIndex: 'itemName',
    key: 'itemName',
    sorter: (a, b) => stringSorter(b.itemName, a.itemName),
    width: 100,
    ellipsis: true,
  },
  {
    title: '옵션',
    dataIndex: 'productVariantName',
    key: 'productVariantName',
    sorter: (a, b) => stringSorter(b.productVariantName, a.productVariantName),
    width: 100,
    ellipsis: true,
  },
  {
    title: '수량',
    dataIndex: 'quantity',
    key: 'quantity',
    sorter: (a, b) => stringSorter(b.quantity, a.quantity),
    width: 100,
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
    title: '구매자 연락처',
    dataIndex: 'buyerPhoneNumber',
    key: 'buyerPhoneNumber',
    render: (value) => addDashToPhoneNumber(value),
    sorter: (a, b) => stringSorter(b.buyerPhoneNumber, a.buyerPhoneNumber),
    width: 100,
    ellipsis: true,
  },
  {
    title: '교환사유',
    dataIndex: 'reason',
    key: 'reason',
    render: (value, record: BaseExchangeRequest) =>
      `[${record.faultOf}] ${value}`,
    width: 100,
    ellipsis: true,
  },
  {
    title: '수취인명',
    dataIndex: 'receiverName',
    key: 'receiverName',
    sorter: (a, b) => stringSorter(b.receiverName, a.receiverName),
    width: 100,
    ellipsis: true,
  },
  {
    title: '수취인 연락처',
    dataIndex: 'receiverPhoneNumber',
    key: 'receiverPhoneNumber',
    render: (value) => addDashToPhoneNumber(value),
    sorter: (a, b) =>
      stringSorter(b.receiverPhoneNumber, a.receiverPhoneNumber),
    width: 100,
    ellipsis: true,
  },
  {
    title: '재배송 택배사',
    dataIndex: 'reshipmentCourierName',
    key: 'reshipmentCourierName',
    sorter: (a, b) =>
      stringSorter(b.reshipmentCourierName, a.reshipmentCourierName),
    width: 100,
    ellipsis: true,
  },
  {
    title: '재배송 송장번호',
    dataIndex: 'reshipmentTrackCode',
    key: 'reshipmentTrackCode',
    sorter: (a, b) =>
      stringSorter(b.reshipmentTrackCode, a.reshipmentTrackCode),
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
    width: 100,
    ellipsis: true,
  },
  {
    title: '판매가격',
    dataIndex: 'itemFinalPrice',
    key: 'itemFinalPrice',
    render: (value) => `${addCommaToNumber(value)} 원`,
    sorter: (a, b) => stringSorter(b.itemFinalPrice, a.itemFinalPrice),
    width: 100,
    ellipsis: true,
  },
  {
    title: '리뷰어',
    dataIndex: 'recommenderNickname',
    key: 'recommenderNickname',
    sorter: (a, b) =>
      stringSorter(b.recommenderNickname, a.recommenderNickname),
    width: 100,
    ellipsis: true,
  },
];
