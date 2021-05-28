import {Button} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import StockEditColumn from './stock-edit-column';
import {renderDateColumn} from '@src/components/molecules/BoardFilter/render';

import {Items_items_products} from '@src/operations/__generated__/Items';

export const stockColumns: ColumnsType<Items_items_products> = [
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
