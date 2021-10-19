import {ColumnsType} from 'antd/lib/table';

import {FlattenShipmentDataType} from '@containers/shipments/hooks';

import {placementsColumns} from '@components/placements';
import {getTimeString} from '@common/helpers';

export const shipmentsColumns: ColumnsType<FlattenShipmentDataType> = [
  ...placementsColumns.slice(0, 3),
  {
    title: '발송일시',
    dataIndex: 'shippingAt',
    key: 'shippingAt',
    render: (value) => getTimeString(value),
    width: 100,
    ellipsis: true,
  },
  ...placementsColumns.slice(3),
];
