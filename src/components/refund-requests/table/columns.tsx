import {ColumnsType} from 'antd/lib/table';

import TrackingViewLink from '@src/components/common/molecules/tracking-view-link';

import {
  FlattenRefundRequestDataType,
  RefundRequestDataType,
} from '@src/containers/refund-requests/hooks';
import {
  addDashToPhoneNumber,
  getRefundRequestStatusDisplayName,
  getOrderClaimFaultOfDisplayName,
  renderPrice,
  renderDateWithTime,
} from '@src/common/helpers';

export const refundRequestsColumns: ColumnsType<FlattenRefundRequestDataType> =
  [
    {
      title: '주문상품번호',
      dataIndex: 'merchantUid',
      key: 'merchantUid',
      width: 100,
      ellipsis: true,
    },
    {
      title: '주문번호',
      dataIndex: 'orderMerchantUid',
      key: 'orderMerchantUid',
      width: 100,
      ellipsis: true,
    },
    {
      title: '반품처리상태',
      dataIndex: 'status',
      key: 'status',
      render: (value) => getRefundRequestStatusDisplayName(value),
      width: 100,
      ellipsis: true,
    },
    {
      title: '반품요청일시',
      dataIndex: 'requestedAt',
      key: 'requestedAt',
      render: renderDateWithTime,
      defaultSortOrder: 'ascend',
      width: 100,
      ellipsis: true,
    },
    {
      title: '반품상품',
      dataIndex: 'orderItems',
      key: 'orderItems',
      render: (_, record: RefundRequestDataType) => {
        const orderItemsInfos = record.orderItems.map(
          (currItem) =>
            `${currItem.itemName} (${currItem.productVariantName} x ${currItem.quantity})`,
        );
        return orderItemsInfos.map((infoStr) => <p key={infoStr}>{infoStr}</p>);
      },
      width: 240,
    },
    {
      title: '구매자명',
      dataIndex: 'buyerName',
      key: 'buyerName',
      width: 100,
      ellipsis: true,
    },
    {
      title: '구매자 연락처',
      dataIndex: 'buyerPhoneNumber',
      key: 'buyerPhoneNumber',
      render: (value) => addDashToPhoneNumber(value),
      width: 100,
      ellipsis: true,
    },
    {
      title: '반품사유',
      dataIndex: 'reason',
      key: 'reason',
      render: (value, record: RefundRequestDataType) =>
        `[${getOrderClaimFaultOfDisplayName(record.faultOf)}] ${value}`,
      width: 240,
    },
    {
      title: '수거배송추적',
      dataIndex: 'trackingViewUrl',
      key: 'trackingViewUrl',
      render: (_, record) => (
        <TrackingViewLink
          label="배송추적"
          courierCode={record.courierCode}
          trackCode={record.trackCode}
        />
      ),
      width: 100,
      ellipsis: true,
    },
    {
      title: '반품금액',
      dataIndex: 'amount',
      key: 'amount',
      render: renderPrice,
      width: 100,
      ellipsis: true,
    },
    {
      title: '배송비차감액',
      dataIndex: 'shippingFee',
      key: 'shippingFee',
      render: renderPrice,
      width: 100,
      ellipsis: true,
    },
  ];
