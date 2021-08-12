import {ColumnsType} from 'antd/lib/table';
import {Product} from '@pickk/common';

import StockEditColumn from './stock-edit-column';
import {renderDateColumn} from '@src/common/helpers/ColumnRenderer';

export const stockColumns: ColumnsType<Product> = [
  {
    title: '프로덕트',
    dataIndex: 'product',
    key: 'product',
    render: (_, {itemOptionValues}) =>
      itemOptionValues.map(({name}) => name).join(', '),
  },
  {
    title: '재고',
    dataIndex: 'stock',
    key: 'stock',
    width: 180,
    render: (value, {id}) => <StockEditColumn id={id} defaultValue={value} />,
  },
  {
    title: '생성일',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: renderDateColumn,
  },
  {
    title: '최근 수정일',
    dataIndex: 'updatedAt',
    key: 'updatedAt',
    render: renderDateColumn,
  },
];
