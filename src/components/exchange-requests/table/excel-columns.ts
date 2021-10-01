import {ExcelColumnsType} from '@pickk/react-excel';
import {ExchangeRequest} from '@pickk/common';

import {exchangeRequestColumns} from './columns';

const excelColumns = exchangeRequestColumns.map(({title, key}) => ({
  label: title.toString(),
  propName: key.toString(),
}));

export const exchangeRequestExcelColumns: ExcelColumnsType<ExchangeRequest> = [
  ...excelColumns.slice(0, 9),
  {
    label: '교환사유',
    propName: 'reason',
    mapValue: ({faultOf, reason}) => `[${faultOf}] ${reason}`,
  },
  ...excelColumns.slice(10),
];
