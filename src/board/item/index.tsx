import {Typography, Button} from 'antd';

import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext} from '@src/contexts/Board';
import {useItemTable} from '@src/hooks/table/Item';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';
import {BoardProps} from '../props';

const {Text} = Typography;

function ItemBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  const newItemColumns = [
    ...itemColumns,
    {
      title: '재고관리',
      dataIndex: 'isStockManaged',
      key: 'isStockManaged',
      sorter: (a, b) => a.isStockManaged > b.isStockManaged,
      width: 60,
      render: value => {
        if (!value) {
          return <Text type="secondary">OFF</Text>;
        }
        return <Button size="small">재고관리</Button>;
      },
    },
  ];

  return (
    <>
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table title={title} columns={newItemColumns} actions={itemActions} />
      <Space level={2} />
    </>
  );
}

export default withBoardContext(
  ItemBoard,
  {name: null, isReviewed: false},
  useItemTable,
  v => v,
);
