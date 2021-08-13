import {ColumnsType} from 'antd/lib/table';

import {getTimeString, stringSorter} from '@src/common/helpers';

import {placementColumns} from '@src/components/placement/table';

export const shipmentsColumns: ColumnsType<any> = [
  ...placementColumns.slice(0, 2),
  {
    title: '주문 일시',
    dataIndex: 'paidAt',
    key: 'paidAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.paidAt, a.paidAt),
    width: 100,
    ellipsis: true,
  },
  {
    title: '발송일시',
    dataIndex: 'shippingAt',
    key: 'shippingAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.shippingAt, a.shippingAt),
    defaultSortOrder: 'ascend',
    width: 100,
    ellipsis: true,
  },
  placementColumns[2],
  ...placementColumns.slice(4),
];
