import {useState} from 'react';
import {ColumnsType} from 'antd/lib/table';

import {useToggleModals} from '@common/hooks';
import {
  sellableItemsColumns,
  SellableItemManageButtons,
  CategoryRenderer,
} from '@components/sellable-items/table';

import {SellableItemDataType} from './use-sellable-items';

const sellableItemsModalTypes = [
  'price',
  'optionStock',
  'info',
  'category',
] as const;
type SellableItemsModalTypes = typeof sellableItemsModalTypes[number];

export const useSellableItemsColumns = () => {
  const [selectedRecord, setSelectedRecord] =
    useState<SellableItemDataType>(null);

  const {
    isModalOpen,
    openModal,
    closeModal: _closeModal,
  } = useToggleModals(sellableItemsModalTypes);

  const closeModal = (type: SellableItemsModalTypes) => {
    _closeModal(type);
    setSelectedRecord(null);
  };

  const newSellableItemsColumns: ColumnsType<SellableItemDataType> = [
    ...sellableItemsColumns.slice(0, 1),
    {
      title: '상품 관리',
      dataIndex: 'itemManage',
      key: 'itemManage',
      width: 100,
      render: (_, record) => (
        <SellableItemManageButtons
          buttons={[
            {
              label: '가격 관리',
              onClick: () => {
                setSelectedRecord(record);
                openModal('price');
              },
            },
            {
              label: '옵션/재고 관리',
              onClick: () => {
                setSelectedRecord(record);
                openModal('optionStock');
              },
            },
            {
              label: '정보 수정',
              onClick: () => {
                setSelectedRecord(record);
                openModal('info');
              },
            },
          ]}
        />
      ),
    },
    ...sellableItemsColumns.slice(1, 2),
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
    ...sellableItemsColumns.slice(2),
  ];

  return {
    sellableItemsColumns: newSellableItemsColumns,
    selectedRecord,
    isPriceModalOpen: isModalOpen.price,
    isOptionStockModalOpen: isModalOpen.optionStock,
    isInfoModalOpen: isModalOpen.info,
    isCategoryModalOpen: isModalOpen.category,
    closePriceModal: () => closeModal('price'),
    closeOptionStockModal: () => closeModal('optionStock'),
    closeInfoModal: () => closeModal('info'),
    closeCategoryModal: () => closeModal('category'),
  };
};
