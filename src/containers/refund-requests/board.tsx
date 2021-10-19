import {useState, useRef} from 'react';

import {BoardTemplate} from '@components/new-common/template';
import {
  refundRequestsColumns,
  refundRequestsExcelColumns,
  refundRequestsFilterInputs,
  refundRequestsPreviews,
  RefundConfirmModal,
} from '@components/refund-requests';

import {BoardTemplateHandle} from '@components/new-common/template/board';

import {
  FlattenRefundRequestDataType,
  useRefundRequests,
  useRefundRequestsActions,
  useRefundRequestsPreveiwData,
} from './hooks';

export default function RefundRequestsBoardContainer() {
  const boardRef = useRef<BoardTemplateHandle>();
  const [selected, setSelected] = useState({keys: [], records: []});

  const handleRowSelectionChange = (
    merchantUids: string[],
    selectedRecords: FlattenRefundRequestDataType[],
  ) => {
    setSelected({
      keys: merchantUids,
      records: selectedRecords,
    });
  };

  const {
    refundRequestsActions,
    isRefundConfirmModalOpen,
    closeRefundConfimModal,
    handleRefundConfirmModalSubmit,
  } = useRefundRequestsActions({
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
        title="반품 관리"
        subTitle="구매자가 요청한 반품 주문건에 대해 완료/거부처리를 진행하실 수 있는 메뉴입니다."
        useBoardData={useRefundRequests}
        columns={refundRequestsColumns}
        excelColumns={refundRequestsExcelColumns}
        filterInputs={refundRequestsFilterInputs}
        actions={refundRequestsActions}
        previews={refundRequestsPreviews}
        usePreviewData={useRefundRequestsPreveiwData}
        keyField="merchantUid"
        selectedRowKeys={selected.keys}
        onRowSelectionChange={handleRowSelectionChange}
      />
      {!!selected?.records?.[0] && (
        <RefundConfirmModal
          record={selected.records[0]}
          isModalOpen={isRefundConfirmModalOpen}
          closeModal={closeRefundConfimModal}
          onSubmit={handleRefundConfirmModalSubmit}
        />
      )}
    </>
  );
}
