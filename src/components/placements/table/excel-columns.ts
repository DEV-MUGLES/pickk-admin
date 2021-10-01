import {ExcelColumnsType} from '@pickk/react-excel';
import {OrderItem} from '@pickk/common';

import {getOrderItemStatusDisplayName} from '@src/common/helpers';

import {placementColumns} from './columns';

const excelColumns = placementColumns.map(({title, key}) => ({
  label: title.toString(),
  propName: key.toString(),
}));

export const placementExcelColumns: ExcelColumnsType<OrderItem> = [
  ...excelColumns.slice(0, 2),
  {
    label: '주문상태',
    propName: 'status',
    mapValue: ({status}) => getOrderItemStatusDisplayName(status),
  },
  ...excelColumns.slice(3, 6),
  ...excelColumns.slice(7),
];
