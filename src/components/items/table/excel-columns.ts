import {ColumnsType} from 'antd/lib/table';

import {ItemDataType} from '@containers/items/hooks';
import {generateExcelColumns, renderDate} from '@src/common/helpers';

import {itemsColumns} from './columns';

export const newItemsColumns: ColumnsType<ItemDataType> = [
  ...itemsColumns.slice(0, 3),
  {
    title: '카테고리',
    dataIndex: 'category',
    key: 'category',
  },
  ...itemsColumns.slice(3),
];

const itemsExcelValueMapper: Record<string, (record: ItemDataType) => string> =
  {
    category: ({majorCategory, minorCategory}) =>
      `${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`,
    createdAt: ({createdAt}) => renderDate(createdAt),
  };

export const itemsExcelColumns = generateExcelColumns<ItemDataType>(
  newItemsColumns,
  itemsExcelValueMapper,
  ['itemView'],
);
