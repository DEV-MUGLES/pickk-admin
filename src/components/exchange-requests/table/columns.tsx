import {ColumnsType} from 'antd/lib/table';

import {FlattenExchangeRequestDataType} from '@containers/exchange-requests/hooks';
import {
  addDashToPhoneNumber,
  getExchangeRequestStatusDisplayName,
  getOrderClaimFaultOfDisplayName,
  renderDateWithTime,
  renderPrice,
} from '@src/common/helpers';

export const exchangeRequestsColumns: ColumnsType<FlattenExchangeRequestDataType> =
  [
    {
      title: '주문상품번호',
      dataIndex: 'merchantUid',
      key: 'merchantUid',
      ellipsis: true,
    },
    {
      title: '주문번호',
      dataIndex: 'orderMerchantUid',
      key: 'orderMerchantUid',
      ellipsis: true,
    },
    {
      title: '교환처리상태',
      dataIndex: 'status',
      key: 'status',
      render: (value) => getExchangeRequestStatusDisplayName(value),
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
      ellipsis: true,
    },
    {
      title: '옵션',
      dataIndex: 'productVariantName',
      key: 'productVariantName',
      width: 100,
    },
    {
      title: '수량',
      dataIndex: 'quantity',
      key: 'quantity',
      ellipsis: true,
    },
    {
      title: '구매자명',
      dataIndex: 'buyerName',
      key: 'buyerName',
      ellipsis: true,
    },
    {
      title: '구매자 연락처',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
      render: (value) => addDashToPhoneNumber(value),
      ellipsis: true,
    },
    {
      title: '교환사유',
      dataIndex: 'reason',
      key: 'reason',
      render: (value, {faultOf}) =>
        `[${getOrderClaimFaultOfDisplayName(faultOf)}] ${value}`,
      ellipsis: true,
    },
    {
      title: '수취인명',
      dataIndex: 'receiverReceiverName',
      key: 'receiverReceiverName',
      ellipsis: true,
    },
    {
      title: '수취인 연락처',
      dataIndex: 'receiverPhoneNumber',
      key: 'receiverPhoneNumber',
      render: (value) => addDashToPhoneNumber(value),
      ellipsis: true,
    },
    {
      title: '재배송 택배사',
      dataIndex: 'reShipmentCourierName',
      key: 'reShipmentCourierName',
      ellipsis: true,
    },
    {
      title: '재배송 송장번호',
      dataIndex: 'reShipmentTrackCode',
      key: 'reShipmentTrackCode',
      ellipsis: true,
    },
    {
      title: '우편번호',
      dataIndex: 'receiverPostalCode',
      key: 'receiverPostalCode',
      ellipsis: true,
    },
    {
      title: '배송지 주소',
      dataIndex: 'receiverBaseAddress',
      key: 'receiverBaseAddress',
      ellipsis: true,
    },
    {
      title: '배송지 상세주소',
      dataIndex: 'receiverDetailAddress',
      key: 'receiverDetailAddress',
      ellipsis: true,
    },
    {
      title: '배송지 주소 (통합)',
      dataIndex: 'receiverFullAddress',
      key: 'receiverFullAddress',
      ellipsis: true,
    },
    {
      title: '판매가격',
      dataIndex: 'itemFinalPrice',
      key: 'itemFinalPrice',
      render: renderPrice,
      ellipsis: true,
    },
    {
      title: '리뷰어',
      dataIndex: 'recommenderNickname',
      key: 'recommenderNickname',
      ellipsis: true,
    },
  ];
