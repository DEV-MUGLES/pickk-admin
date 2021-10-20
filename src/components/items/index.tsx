import React, {useState} from 'react';
import {message} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {Item} from '@pickk/common';

import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {useBoardContext} from '@src/common/contexts/Board';
import {TableActionType} from '@src/components/common/organisms/Board/Table/table';
import {BoardProps} from '../props';

import {CategoryModal} from './table/modal';
import {CategoryRenderer} from './table/renderers';

import {itemInputs} from './inputs';
import {itemColumns, itemsExcelColumns} from './table';
import {useBulkUpdateIsSellable} from '../sellable-items/table/actions/hooks';

function ItemsBoard(props: BoardProps) {
  const {
    action: {setSelectedRowId},
  } = useBoardContext();

  const {bulkUpdateIsSellable} = useBulkUpdateIsSellable();

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
      width: 150,
      align: 'center',
      render: (_, {id, majorCategory, minorCategory}) => (
        <CategoryRenderer
          majorCategoryName={majorCategory?.name}
          minorCategoryName={minorCategory?.name}
          onUpdateClick={() => {
            setSelectedRowId(id);
            handleModalOpen(true);
          }}
        />
      ),
    },
    ...itemColumns.slice(3),
  ];

  const itemActions: TableActionType[] = [
    {
      text: '상품 활성화',
      onClick: async (ids: number[]) => {
        try {
          if (confirm('상품을 활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(ids, true);
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
    {
      text: '상품 비활성화',
      onClick: async (ids: number[]) => {
        try {
          if (confirm('상품을 비활성화 하시겠습니까?')) {
            await bulkUpdateIsSellable(ids, false);
          }
        } catch (err) {
          message.error('실패했습니다. err - ' + err);
        }
      },
    },
  ];

  return (
    <>
      <Header {...props} />
      <Filter {...props} inputs={itemInputs} />
      <Table
        {...props}
        columns={newItemColumns}
        excelColumns={itemsExcelColumns}
        actions={itemActions}
      />
      {modalVisible && (
        <CategoryModal
          visible={modalVisible}
          onClose={() => handleModalOpen(false)}
        />
      )}
    </>
  );
}

export default ItemsBoard;
