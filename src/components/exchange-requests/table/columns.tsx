import {ColumnsType} from 'antd/lib/table';

import {FlattenExchangeRequestDataType} from '@containers/exchange-requests/hooks';
import {
  addDashToPhoneNumber,
  getExchangeRequestStatusDisplayName,
  getOrderClaimFaultOfDisplayName,
  renderDateWithTime,
  renderPrice,
  stringSorter,
} from '@src/common/helpers';

export const exchangeRequestsColumns: ColumnsType<FlattenExchangeRequestDataType> =
  [
    {
      title: '주문상품번호',
      dataIndex: 'merchantUid',
      key: 'merchantUid',
      sorter: (a, b) => stringSorter(b.merchantUid, a.merchantUid),
      ellipsis: true,
    },
    {
      title: '주문번호',
      dataIndex: 'orderMerchantUid',
      key: 'orderMerchantUid',
      sorter: (a, b) => stringSorter(b.orderMerchantUid, a.orderMerchantUid),
      ellipsis: true,
    },
    {
      title: '교환처리상태',
      dataIndex: 'status',
      key: 'status',
      render: (value) => getExchangeRequestStatusDisplayName(value),
      sorter: (a, b) => stringSorter(b.status, a.status),
      ellipsis: true,
    },
    {
      title: '교환요청일시',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      render: renderDateWithTime,
      ellipsis: true,
    },
    {
      title: '상품명',
      dataIndex: 'itemName',
      key: 'itemName',
      sorter: (a, b) => stringSorter(b.itemName, a.itemName),
      ellipsis: true,
    },
    {
      title: '옵션',
      dataIndex: 'productVariantName',
      key: 'productVariantName',
      sorter: (a, b) =>
        stringSorter(b.productVariantName, a.productVariantName),
      width: 100,
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => stringSorter(b.quantity, a.quantity),
      ellipsis: true,
    },
    {
      title: '구매자명',
      dataIndex: 'buyerName',
      key: 'buyerName',
      sorter: (a, b) => stringSorter(b.buyerName, a.buyerName),
      ellipsis: true,
    },
    {
      title: '구매자 연락처',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
      render: (value) => addDashToPhoneNumber(value),
      sorter: (a, b) => stringSorter(b.buyerPhoneNumber, a.buyerPhoneNumber),
      ellipsis: true,
    },
    {
      title: '교환사유',
      dataIndex: 'reason',
      key: 'reason',
      render: (value, {faultOf}) =>
        `[${getOrderClaimFaultOfDisplayName(faultOf)}] ${value}`,
      width: 260,
    },
    {
      title: '수취인명',
      dataIndex: 'receiverReceiverName',
      key: 'receiverReceiverName',
      sorter: (a, b) =>
        stringSorter(b.receiverReceiverName, a.receiverReceiverName),
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
      sorter: (a, b) =>
        stringSorter(b.receiverPostalCode, a.receiverPostalCode),
      ellipsis: true,
    },
    {
      title: '배송지 주소',
      dataIndex: 'receiverBaseAddress',
      key: 'receiverBaseAddress',
      sorter: (a, b) =>
        stringSorter(b.receiverBaseAddress, a.receiverBaseAddress),
      width: 240,
    },
    {
      title: '배송지 상세주소',
      dataIndex: 'receiverDetailAddress',
      key: 'receiverDetailAddress',
      sorter: (a, b) =>
        stringSorter(b.receiverDetailAddress, a.receiverDetailAddress),
      width: 160,
    },
    {
      title: '배송지 주소 (통합)',
      dataIndex: 'receiverFullAddress',
      key: 'receiverFullAddress',
      sorter: (a, b) =>
        stringSorter(b.receiverFullAddress, a.receiverFullAddress),
      width: 240,
    },
    {
      title: '판매가격',
      dataIndex: 'itemFinalPrice',
      key: 'itemFinalPrice',
      render: renderPrice,
      sorter: (a, b) => stringSorter(b.itemFinalPrice, a.itemFinalPrice),
      ellipsis: true,
    },
    {
      title: '리뷰어',
      dataIndex: 'recommenderNickname',
      key: 'recommenderNickname',
      sorter: (a, b) =>
        stringSorter(b.recommenderNickname, a.recommenderNickname),
      ellipsis: true,
    },
  ];
