import {useState} from 'react';
import {ColumnsType} from 'antd/lib/table';

import {itemsColumns} from '@components/items';
import {CategoryRenderer} from '@components/sellable-items';

import {useToggleModals} from '@common/hooks';

import {ItemDataType} from './use-items';

const itemsModalTypes = ['category'] as const;
type ItemsModalTypes = typeof itemsModalTypes[number];

export const useItemsColumns = () => {
  const [selectedRecord, setSelectedRecord] = useState<ItemDataType>(null);

  const {
    isModalOpen,
    openModal,
    closeModal: _closeModal,
  } = useToggleModals(itemsModalTypes);

  const closeModal = (type: ItemsModalTypes) => {
    _closeModal(type);
    setSelectedRecord(null);
  };

  const newItemsColumns: ColumnsType<ItemDataType> = [
    ...itemsColumns.slice(0, 3),
    {
      title: '카테고리',
      dataIndex: 'category',
      key: 'category',
      width: 100,
      align: 'center',
      render: (_, record) => (
        <CategoryRenderer
          majorCategoryName={record.majorCategory?.name}
          minorCategoryName={record.minorCategory?.name}
          onUpdateClick={() => {
            setSelectedRecord(record);
            openModal('category');
          }}
        />
      ),
    },
    ...itemsColumns.slice(3),
  ];

  return {
    itemsColumns: newItemsColumns,
    selectedRecord,
    isCategoryModalOpen: isModalOpen.category,
    closeCategoryModal: () => closeModal('category'),
  };
};
