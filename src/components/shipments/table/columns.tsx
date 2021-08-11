import {getTimeString, stringSorter} from '@src/common/helpers';

import {placementColumns} from '@src/components/placement/table';

export const shipmentsColumns = [
  ...placementColumns.slice(0, 3),
  {
    title: '발송일시',
    dataIndex: 'shippingAt',
    key: 'shippingAt',
    render: (value) => <div>{getTimeString(value)}</div>,
    sorter: (a, b) => stringSorter(b.shippingAt, a.shippingAt),
    width: 100,
    ellipsis: true,
  },
  ...placementColumns.slice(3),
];
