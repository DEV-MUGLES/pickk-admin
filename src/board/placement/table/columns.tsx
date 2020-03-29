import {Button} from 'antd';

import {orderItemColumns} from '@src/board/order-items/table';
import {stringSorter} from '@src/lib/sorter';

export const placementColumns = [
  ...orderItemColumns.slice(0, orderItemColumns.length - 3),
  {
    title: '택배사',
    dataIndex: 'courier',
    key: 'courier',
    sorter: (a, b) => stringSorter(b.courier, a.courier),
    width: 100,
    ellipsis: true,
  },
  {
    title: '송장번호',
    dataIndex: 'trackingCode',
    key: 'trackingCode',
    sorter: (a, b) => b.trackingCode - a.trackingCode,
    width: 150,
    ellipsis: true,
  },
  {
    title: '배송추적',
    dataIndex: 'trackingViewUrl',
    key: 'trackingViewUrl',
    render: value =>
      value ? (
        <a href={value} target="_blank">
          <Button size="small">배송추적</Button>
        </a>
      ) : null,
    sorter: (a, b) => b.trackingViewUrl - a.trackingViewUrl,
    width: 100,
    ellipsis: true,
  },
  ...orderItemColumns.slice(
    orderItemColumns.length - 3,
    orderItemColumns.length,
  ),
];
