import {Button} from 'antd';

import {orderItemColumns} from '@src/components/order-items/table';
import {stringSorter} from '@src/common/helpers/sorter';

export const placementColumns = [
  ...orderItemColumns,
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
    title: '배송지',
    dataIndex: '',
    key: '',
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
  {
    title: '우편번호',
    dataIndex: '',
    key: '',
    width: 120,
    ellipsis: true,
  },
];
