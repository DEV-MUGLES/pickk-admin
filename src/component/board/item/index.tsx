import React, {useState} from 'react';
import {Button, Typography} from 'antd';
import {ColumnsType} from 'antd/lib/table';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';
import CategoryModal from './table/modal/category';

import {useBoardContext, withBoardContext} from '@src/contexts/Board';
import {BoardProps} from '../props';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';

import {ITEMS_QUERY} from '@src/operations/item/query';
import {Items_items} from '@src/operations/__generated__/Items';

const {Text} = Typography;

type ItemBoardModalType = 'category' | 'image';

function ItemBoard({title}: BoardProps) {
  const {
    action: {setSelectedData},
  } = useBoardContext();

  const [modalVisible, setModalVisible] = useState<
    Record<ItemBoardModalType, boolean>
  >({
    category: false,
    image: false,
  });

  const handleModalOpen = (name: ItemBoardModalType) => (open: boolean) => {
    setModalVisible({
      ...modalVisible,
      [name]: open,
    });
  };

  const newItemColumns: ColumnsType<Items_items> = [
    ...itemColumns.slice(0, 3),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      align: 'center',
      render: (_, record) => {
        const {majorCategory, minorCategory} = record;
        return (
          <div>
            <Text>{`${majorCategory?.name ?? '-'}/${
              minorCategory?.name ?? '-'
            }`}</Text>
            <Button
              size="small"
              onClick={() => {
                setSelectedData(record);
                handleModalOpen('category')(true);
              }}
              style={{marginLeft: '0.6rem'}}>
              수정
            </Button>
          </div>
        );
      },
    },
    ...itemColumns.slice(3),
  ];

  return (
    <>
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table title={title} columns={newItemColumns} actions={itemActions} />
      <CategoryModal
        visible={modalVisible.category}
        onClose={() => handleModalOpen('category')(false)}
      />
    </>
  );
}

export default withBoardContext(
  ItemBoard,
  {},
  {
    gql: ITEMS_QUERY.gql,
    dataName: ITEMS_QUERY.dataName,
    filterName: 'itemFilter',
  },
  (v) => v,
);
