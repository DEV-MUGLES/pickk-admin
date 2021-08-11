import {getTimeString} from '@src/common/helpers/date';
import {addDashToPhoneNumber} from '@src/common/helpers/PhoneNumberParser';
import {stringSorter} from '@src/common/helpers/sorter';
import {Button} from 'antd';
import {addCommaToNumber} from '@src/common/helpers/NumberParser';
import {orderItemColumns} from '@src/components/order-items/table';

export const refundRequestColumns = [
  ...orderItemColumns.slice(0, 2), // 주문상품번호, 주문번호
  {
    title: '반품처리상태',
    dataIndex: 'refundRequestStatus',
    key: 'refundRequestStatus',
    sorter: (a, b) =>
      stringSorter(b.refundRequestStatus, a.refundRequestStatus),
    width: 100,
    ellipsis: true,
  },
  {
    title: '반품요청일시',
    dataIndex: 'refundRequestedAt',
    key: 'refundRequestedAt',
    sorter: (a, b) => stringSorter(b.refundRequestedAt, a.refundRequestedAt),
    width: 100,
    ellipsis: true,
  },
  ...orderItemColumns.slice(5, 10), // 상품명 ~ 구매자 연락처
  {
    title: '반품사유',
    dataIndex: 'refundRequestReason',
    key: 'refundRequestReason',
    sorter: (a, b) =>
      stringSorter(b.refundRequestReason, a.refundRequestReason),
    width: 200,
    ellipsis: true,
  },
  // @TODO
  {
    title: '수거배송추적',
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
  {
    title: '상품금액',
    dataIndex: 'itemFinalPrice',
    key: 'itemFinalPrice',
    sorter: (a, b) => stringSorter(b.itemFinalPrice, a.itemFinalPrice),
    width: 200,
    ellipsis: true,
  },
  {
    title: '배송비 차감액',
    dataIndex: 'shippingFee',
    key: 'shippingFee',
    sorter: (a, b) => stringSorter(b.shippingFee, a.shippingFee),
    width: 200,
    ellipsis: true,
  },
];
