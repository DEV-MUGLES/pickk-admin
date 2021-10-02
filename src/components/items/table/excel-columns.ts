import {ExcelColumnsType} from '@pickk/react-excel';
import {Item} from '@pickk/common';

import {itemColumns} from './columns';

const excelColumns = itemColumns.map(({title, key}) => ({
  label: title.toString(),
  propName: key.toString(),
}));

export const itemsExcelColumns: ExcelColumnsType<Item> = [
  excelColumns[0],
  ...excelColumns.slice(2, 3),
  {
    label: '카테고리',
    propName: 'category',
    mapValue: ({majorCategory, minorCategory}) =>
      `${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`,
  },
  ...excelColumns.slice(4),
];
