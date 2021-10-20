import {ColumnsType} from 'antd/lib/table';

import {SellableItemDataType} from '@containers/sellable-items/hooks';
import {generateExcelColumns, renderDate} from '@src/common/helpers';

import {sellableItemsColumns} from './columns';

const newSellableItemsColumns: ColumnsType<SellableItemDataType> = [
  ...sellableItemsColumns.slice(0, 2),
  {
    title: '카테고리',
    dataIndex: 'category',
    key: 'category',
  },
  ...sellableItemsColumns.slice(2, 6),
  {
    title: '보유재고',
    dataIndex: 'stock',
    key: 'stock',
  },
  ...sellableItemsColumns.slice(7),
];

const sellableItemsExcelValueMapper: Record<
  string,
  (record: SellableItemDataType) => string
> = {
  category: ({majorCategory, minorCategory}) =>
    `${majorCategory?.name ?? '-'}/${minorCategory?.name ?? '-'}`,
  stock: ({products}) =>
    products
      .filter((v) => !v.isDeleted)
      .reduce((acc, {stock}) => (acc += stock), 0)
      .toString(),
  urls: ({urls}) => urls.find((url) => url.isPrimary)?.url,
  sellableAt: ({sellableAt}) => renderDate(sellableAt),
};

export const sellableItemsExcelColumns =
  generateExcelColumns<SellableItemDataType>(
    newSellableItemsColumns,
    sellableItemsExcelValueMapper,
  );
