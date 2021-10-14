import {ExcelColumnsType} from '@pickk/react-excel';
import {OrderItem} from '@pickk/common';

import {
  getOrderItemClaimStatusDisplayName,
  getOrderItemStatusDisplayName,
} from '@src/common/helpers';

import {orderItemColumns} from './columns';

const excelColumns = orderItemColumns.map(({title, key}) => ({
  label: title.toString(),
  propName: key.toString(),
}));

export const orderItemExcelColumns: ExcelColumnsType<OrderItem> = [
  ...excelColumns.slice(0, 2),
  {
    label: '주문상태',
    propName: 'status',
    mapValue: ({status, isConfirmed}) =>
      getOrderItemStatusDisplayName(status, isConfirmed),
  },
  {
    label: '클레임 상태',
    propName: 'claimStatus',
    mapValue: ({claimStatus}) =>
      getOrderItemClaimStatusDisplayName(claimStatus),
  },
  ...excelColumns.slice(5),
];
