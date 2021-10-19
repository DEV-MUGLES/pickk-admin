import {ExcelColumnsType} from '@pickk/react-excel';
import {OrderItem} from '@pickk/common';

import {getTimeString} from '@src/common/helpers';

import {placementExcelColumns} from '@components/deprecated-placements/table';

export const shipmentsExcelColumns: ExcelColumnsType<OrderItem> = [
  ...placementExcelColumns.slice(0, 3),
  {
    label: '발송일시',
    propName: 'shippingAt',
    mapValue: ({shippingAt}) => getTimeString(shippingAt),
  },
  ...placementExcelColumns.slice(3),
];
