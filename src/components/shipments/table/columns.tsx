import {ColumnsType} from 'antd/lib/table';

import {getTimeString, stringSorter} from '@src/common/helpers';

import {placementColumns} from '@src/components/placements/table';

export const shipmentsColumns: ColumnsType<any> = [
  ...placementColumns.slice(0, 3),
  {
    title: '발송일시',
    dataIndex: 'shippingAt',
    key: 'shippingAt',
    render: (value) => getTimeString(value),
    sorter: (a, b) => stringSorter(b.shippingAt, a.shippingAt),
    defaultSortOrder: 'ascend',
    width: 100,
    ellipsis: true,
  },
  ...placementColumns.slice(3),
];
