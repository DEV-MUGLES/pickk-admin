import {ExcelColumnsType} from '@pickk/react-excel';
import {RefundRequest} from '@pickk/common';

import {
  getOrderClaimFaultOfDisplayName,
  getRefundRequestStatusStatusDisplayName,
} from '@src/common/helpers';

import {refundRequestColumns} from './columns';

const excelColumns = refundRequestColumns.map(({title, key}) => ({
  label: title.toString(),
  propName: key.toString(),
}));

export const refundRequestExcelColumns: ExcelColumnsType<RefundRequest> = [
  ...excelColumns.slice(0, 2),
  {
    label: '반품처리상태',
    propName: 'status',
    mapValue: ({status}) => getRefundRequestStatusStatusDisplayName(status),
  },
  ...excelColumns.slice(3, 4),
  {
    label: '반품상품',
    propName: 'orderItems',
    mapValue: ({orderItems}) =>
      orderItems
        .map(
          (currItem) =>
            `${currItem.itemName} (${currItem.productVariantName} x ${currItem.quantity})`,
        )
        .join(', '),
  },
  ...excelColumns.slice(5, 7),
  {
    label: '반품사유',
    propName: 'reason',
    mapValue: ({faultOf, reason}) =>
      `[${getOrderClaimFaultOfDisplayName(faultOf)}] ${reason}`,
  },
  ...excelColumns.slice(9),
];
