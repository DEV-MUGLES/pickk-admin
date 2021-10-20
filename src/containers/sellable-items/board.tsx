import {useRef, useState} from 'react';

import {BoardTemplate} from '@components/new-common/template';
import {
  sellableItemsExcelColumns,
  sellableItemsFilterInputs,
  CategoryModal,
  ItemPriceManageDrawer,
  ItemOptionStockManageDrawer,
  ItemInfoManageDrawer,
} from '@components/sellable-items';

import {BoardTemplateHandle} from '@components/new-common/template/board';

import {
  useSellableItems,
  useSellableItemsActions,
  useSellableItemsColumns,
} from './hooks';

export default function SellableItemsBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();
  const [selectedIds, setSelectedIds] = useState([]);

  const {
    sellableItemsColumns,
    selectedRecord,
    isPriceModalOpen,
    isOptionStockModalOpen,
    isCategoryModalOpen,
    isInfoModalOpen,
    closePriceModal,
    closeOptionStockModal,
    closeCategoryModal,
    closeInfoModal,
  } = useSellableItemsColumns();
  const {sellableItemsActions} = useSellableItemsActions({
    selectedIds,
    initSelection: () => setSelectedIds([]),
    reload: boardRef?.current?.reload,
  });

  return (
    <>
      <BoardTemplate
        ref={boardRef}
        title="활성상품 관리"
        subTitle="판매 가능한 상품을 관리할 수 있는 메뉴입니다."
        useBoardData={useSellableItems}
        columns={sellableItemsColumns}
        excelColumns={sellableItemsExcelColumns}
        filterInputs={sellableItemsFilterInputs}
        actions={sellableItemsActions}
        selectedRowKeys={selectedIds}
        onRowSelectionChange={setSelectedIds}
      />
      {!!selectedRecord && (
        <ItemPriceManageDrawer
          itemId={selectedRecord.id}
          visible={isPriceModalOpen}
          onClose={closePriceModal}
        />
      )}
      {!!selectedRecord && (
        <ItemOptionStockManageDrawer
          itemId={selectedRecord.id}
          visible={isOptionStockModalOpen}
          onClose={closeOptionStockModal}
        />
      )}
      {!!selectedRecord && (
        <ItemInfoManageDrawer
          itemId={selectedRecord.id}
          visible={isInfoModalOpen}
          onClose={closeInfoModal}
        />
      )}
      {!!selectedRecord && (
        <CategoryModal
          itemId={selectedRecord.id}
          defaultCategory={{
            majorCategoryId: selectedRecord.majorCategory?.id,
            minorCategoryId: selectedRecord.minorCategory?.id,
          }}
          visible={isCategoryModalOpen}
          onClose={closeCategoryModal}
        />
      )}
    </>
  );
}
