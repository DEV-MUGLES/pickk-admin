import {useState, useRef} from 'react';

import {BoardTemplate} from '@components/common/templates';
import {ShipModal} from '@components/placements';
import {ShipModalDataType} from '@components/placements/table/modals/ship';
import {
  exchangeRequestsColumns,
  exchangeRequestsExcelColumns,
  exchangeRequestsFilterInputs,
  exchangeRequestsPreviews,
} from '@components/exchange-requests';

import {BoardTemplateHandle} from '@components/common/templates/board';

import {
  FlattenExchangeRequestDataType,
  useExchangeRequests,
  useExchangeRequestsPreveiwData,
  useExchangeRequestsActions,
} from './hooks';

export default function ExchangeRequestsBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();
  const [selected, setSelected] = useState({keys: [], records: []});

  const handleRowSelectionChange = (
    merchantUids: string[],
    selectedRecords: FlattenExchangeRequestDataType[],
  ) => {
    setSelected({
      keys: merchantUids,
      records: selectedRecords,
    });
  };

  const {
    exchangeRequestsActions,
    isShipModalOpen,
    closeShipModal,
    handleShipModalSubmit,
  } = useExchangeRequestsActions({
    selectedMerchantUids: selected.keys,
    selectedRecords: selected.records,
    initSelection: () => {
      setSelected({keys: [], records: []});
    },
    reload: boardRef?.current?.reload,
  });

  const getModalData = (): ShipModalDataType => {
    const selectedData = selected.records[0];
    if (!selectedData) {
      return null;
    }
    return {
      ...selectedData,
      courierId: selectedData.reshipmentCourierId,
      trackCode: selectedData.reshipmentTrackCode,
    };
  };

  return (
    <>
      <BoardTemplate
        ref={boardRef}
        title="교환 관리"
        subTitle="구매자가 요청한 교환 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
        useBoardData={useExchangeRequests}
        columns={exchangeRequestsColumns}
        excelColumns={exchangeRequestsExcelColumns}
        filterInputs={exchangeRequestsFilterInputs}
        actions={exchangeRequestsActions}
        previews={exchangeRequestsPreviews}
        usePreviewData={useExchangeRequestsPreveiwData}
        keyField="merchantUid"
        selectedRowKeys={selected.keys}
        onRowSelectionChange={handleRowSelectionChange}
      />
      {!!selected?.records?.[0] && (
        <ShipModal
          title="재발송처리"
          modalData={getModalData()}
          isModalOpen={isShipModalOpen}
          closeModal={closeShipModal}
          onSubmit={handleShipModalSubmit}
        />
      )}
    </>
  );
}
