import React, {useState} from 'react';
import {Button, Typography} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {Item} from '@pickk/common';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';
import CategoryModal from './table/modal/category';

import {useBoardContext, withBoardContext} from '@src/contexts/Board';
import {BoardProps} from '../props';
import {useItems} from '@src/hooks/apis';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';

const {Text} = Typography;

function ItemBoard({title}: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleModalOpen = (open: boolean) => {
    setModalVisible(open);
  };

  const newItemColumns: ColumnsType<Item> = [
    ...itemColumns.slice(0, 3),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      align: 'center',
      render: (_, {id, majorCategory, minorCategory}) => {
        return (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Text>{`${majorCategory?.name ?? '-'}/${
              minorCategory?.name ?? '-'
            }`}</Text>
            <Button
              size="small"
              onClick={() => {
                setSelectedRowId(id);
                handleModalOpen(true);
              }}
              style={{marginTop: '0.6rem'}}>
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
      {modalVisible && (
        <CategoryModal
          visible={modalVisible}
          onClose={() => handleModalOpen(false)}
        />
      )}
    </>
  );
}

export default withBoardContext(
  ItemBoard,
  {
    useBoardData: useItems,
    dataName: 'items',
    filterName: 'itemFilter',
  },
  (v) => v,
);
