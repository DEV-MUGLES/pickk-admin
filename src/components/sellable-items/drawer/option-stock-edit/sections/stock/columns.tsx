import {ColumnsType} from 'antd/lib/table';
import {Product} from '@pickk/common';

import StockEditColumn from './stock-edit-column';
import {renderDateColumn} from '@src/common/helpers/ColumnRenderer';
import {addCommaToNumber, stringSorter} from '@src/common/helpers';

export const stockColumns: ColumnsType<Product> = [
  {
    title: '프로덕트',
    dataIndex: 'product',
    key: 'product',
    render: (_, {itemOptionValues}) => {
      return [...itemOptionValues]
        .sort((a, b) => a.itemOptionId - b.itemOptionId)
        .map(({name}) => name)
        .join(', ');
    },
  },
  {
    title: '재고',
    dataIndex: 'stock',
    key: 'stock',
    render: (value, {id}) => <StockEditColumn id={id} defaultValue={value} />,
  },
  {
    title: '옵션별 추가금',
    dataIndex: 'priceVariant',
    key: 'priceVariant',
    render: (value) => addCommaToNumber(value) + ' 원',
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => stringSorter(a.createdAt, b.createdAt),
    render: renderDateColumn,
  },
  {
    title: '최근 수정일',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: renderDateColumn,
  },
];
