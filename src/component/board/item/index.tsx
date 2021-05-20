import React, {useState} from 'react';
import {Button, Image, Typography} from 'antd';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';
import CategoryModal from './table/modal/category';

import {useBoardContext, withBoardContext} from '@src/contexts/Board';
import {BoardProps} from '../props';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';

import {ITEMS_QUERY} from '@src/operations/item/query';

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

  const newItemColumns = [
    ...itemColumns.slice(0, 1),
    {
      title: '상세보기',
      dataIndex: 'itemManage',
      key: 'itemManage',
      width: 100,
      render: (_, {id}) => <Button size="small">상세보기</Button>,
      ellipsis: true,
    },
    {
      title: '대표이미지',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 120,
      render: (text) => (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <Image src={text} />
          <Button size="small">수정</Button>
        </div>
      ),
      ellipsis: true,
    },
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      render: (_, record) => {
        const {majorCategory, minorCategory} = record;
        return (
          <>
            <Text>{`${majorCategory?.name ?? '-'}/${
              minorCategory?.name ?? '-'
            }`}</Text>
            <Button
              size="small"
              onClick={() => {
                setSelectedData(record);
                handleModalOpen('category')(true);
              }}>
              수정
            </Button>
          </>
        );
      },
    },
    ...itemColumns.slice(1),
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
