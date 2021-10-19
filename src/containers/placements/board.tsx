import {useState, useRef} from 'react';

import {BoardTemplate} from '@components/new-common/template';
import {
  placementsColumns,
  placementsExcelColumns,
  placementsFilterInputs,
  placementPreviews,
  ShipModal,
  CancelOrderItemModal,
} from '@components/placements';

import {BoardTemplateHandle} from '@components/new-common/template/board';

import {
  FlattenPlacementDataType,
  usePlacementActions,
  usePlacementsPreviewData,
  usePlacements,
} from './hooks';

export default function PlacementsBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();
  const [selected, setSelected] = useState({keys: [], records: []});

  const handleRowSelectionChange = (
    merchantUids: string[],
    selectedRecords: FlattenPlacementDataType[],
  ) => {
    setSelected({
      keys: merchantUids,
      records: selectedRecords,
    });
  };

  const initSelection = () => {
    setSelected({keys: [], records: []});
  };

  const {
    placementActions,
    isShipModalOpen,
    isCancelOrderItemModalOpen,
    closeShipModal,
    closeCancelOrderItemModal,
    handleShipModalSubmit,
    handleCancelOrderItemModalSubmit,
  } = usePlacementActions({
    selectedMerchantUids: selected.keys,
    selectedRecords: selected.records,
    initSelection,
    reload: boardRef?.current?.reload,
  });

  return (
    <>
      <BoardTemplate
        ref={boardRef}
        title="발주/발송 관리"
        subTitle="신규 주문건 확인 및 발주/발송처리를 진행하실 수 있는 메뉴입니다."
        useBoardData={usePlacements}
        columns={placementsColumns}
        excelColumns={placementsExcelColumns}
        filterInputs={placementsFilterInputs}
        actions={placementActions}
        previews={placementPreviews}
        usePreviewData={usePlacementsPreviewData}
        keyField="merchantUid"
        selectedRowKeys={selected.keys}
        onRowSelectionChange={handleRowSelectionChange}
      />
      {!!selected?.records?.[0] && (
        <ShipModal
          isModalOpen={isShipModalOpen}
          closeModal={closeShipModal}
          modalData={selected.records[0]}
          onSubmit={handleShipModalSubmit}
        />
      )}
      {!!selected?.keys?.[0] && (
        <CancelOrderItemModal
          isModalOpen={isCancelOrderItemModalOpen}
          closeModal={closeCancelOrderItemModal}
          merchantUid={selected.keys[0]}
          onSubmit={handleCancelOrderItemModalSubmit}
        />
      )}
    </>
  );
}
