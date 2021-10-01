import {ExcelColumnsType} from '@pickk/react-excel';
import {Item} from '@pickk/common';

import {sellableItemColumns} from './columns';

const excelColumns = sellableItemColumns.map(({title, key}) => ({
  label: title.toString(),
  propName: key.toString(),
}));

export const sellableItemExcelColumns: ExcelColumnsType<Item> = [
  ...excelColumns.slice(0, 2),
  {
    label: '카테고리',
    propName: 'category',
    mapValue: ({majorCategory, minorCategory}) =>
      `${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`,
  },
  ...excelColumns.slice(3, 7),
  {
    label: '보유재고',
    propName: 'stock',
    mapValue: ({products}) =>
      products.reduce((acc, {stock}) => (acc += stock), 0),
  },
  excelColumns[8],
  {
    label: '공홈링크',
    propName: 'urls',
    mapValue: ({urls}) => urls.find((url) => url.isPrimary)?.url,
  },
  excelColumns[10],
];
