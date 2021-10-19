import {useState, useRef} from 'react';

import {BoardTemplate} from '@components/new-common/template';
import {
  shipmentsColumns,
  shipmentsExcelColumns,
  shipmentsFilterInputs,
  shipmentPreviews,
  TrackCodeUpdateModal,
} from '@components/shipments';

import {BoardTemplateHandle} from '@components/new-common/template/board';

import {
  FlattenShipmentDataType,
  useShipments,
  useShipmentsActions,
  useShipmentsPreviewData,
} from './hooks';

export default function ShipmentsBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();
  const [selected, setSelected] = useState<{
    keys: string[];
    records: FlattenShipmentDataType[];
  }>({keys: [], records: []});

  const handleRowSelectionChange = (
    merchantUids: string[],
    selectedRecords: FlattenShipmentDataType[],
  ) => {
    setSelected({
      keys: merchantUids,
      records: selectedRecords,
    });
  };

  const {
    shipmentActions,
    isTrackCodeUpdateModalOpen,
    closeTrackCodeUpdateModal,
    handleTrackCodeUpdateModalSubmit,
  } = useShipmentsActions({
    selectedMerchantUids: selected.keys,
    selectedRecords: selected.records,
    initSelection: () => {
      setSelected({keys: [], records: []});
    },
    reload: boardRef?.current?.reload,
  });

  return (
    <>
      <BoardTemplate
        ref={boardRef}
        title="배송현황 관리"
        subTitle="배송중, 배송완료 진행중인 주문건 및 구매확정 연장된 주문건을 확인하실 수 있는 메뉴입니다."
        useBoardData={useShipments}
        columns={shipmentsColumns}
        excelColumns={shipmentsExcelColumns}
        filterInputs={shipmentsFilterInputs}
        actions={shipmentActions}
        previews={shipmentPreviews}
        usePreviewData={useShipmentsPreviewData}
        keyField="merchantUid"
        selectedRowKeys={selected.keys}
        onRowSelectionChange={handleRowSelectionChange}
      />
      {isTrackCodeUpdateModalOpen && (
        <TrackCodeUpdateModal
          merchantUid={selected.keys[0]}
          defaultTrackCode={selected.records[0]?.shipment?.trackCode}
          visible={isTrackCodeUpdateModalOpen}
          onClose={closeTrackCodeUpdateModal}
          onSubmit={handleTrackCodeUpdateModalSubmit}
        />
      )}
    </>
  );
}
