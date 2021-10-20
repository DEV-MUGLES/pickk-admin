import {useRef, useState} from 'react';

import {BoardTemplate} from '@components/new-common/template';
import {itemsExcelColumns} from '@components/items';
import {
  sellableItemsFilterInputs,
  CategoryModal,
} from '@components/sellable-items';

import {BoardTemplateHandle} from '@components/new-common/template/board';

import {useItems, useItemsActions, useItemsColumns} from './hooks';

export default function ItemsBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();
  const [selectedIds, setSelectedIds] = useState([]);

  const {
    itemsColumns,
    selectedRecord,
    isCategoryModalOpen,
    closeCategoryModal,
  } = useItemsColumns();

  const {itemsActions} = useItemsActions({
    selectedIds,
    initSelection: () => setSelectedIds([]),
    reload: boardRef?.current?.reload,
  });

  return (
    <>
      <BoardTemplate
        ref={boardRef}
        title="전체상품 관리"
        subTitle="등록된 전체 상품을 조회/수정할 수 있는 메뉴입니다."
        useBoardData={useItems}
        columns={itemsColumns}
        excelColumns={itemsExcelColumns}
        filterInputs={sellableItemsFilterInputs}
        actions={itemsActions}
        selectedRowKeys={selectedIds}
        onRowSelectionChange={setSelectedIds}
      />
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
