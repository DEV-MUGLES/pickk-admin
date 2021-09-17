import {useState} from 'react';
import {message} from 'antd';
import {RefundRequestStatus} from '@pickk/common';

import RefundConfirmModal from './table/modal/confirm';
import Preview from '@src/components/common/organisms/Board/preview';
import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {useBoardContext} from '@src/common/contexts/Board';

import {refundRequestInputs} from './inputs';
import {refundRequestPreviewData} from './preview-data';
import {refundRequestColumns} from './table';
import {BoardProps} from '../props';
import {TableActionType} from '@src/components/common/organisms/Board/Table/table';

import {
  useBulkPickMeSellerRefundRequests,
  useRefundRequestPreview,
} from './hooks';

function RefundRequestsBoard({title, subTitle}: BoardProps) {
  const {state} = useBoardContext();
  const {tableData} = state;

  const {bulkPickMeSellerRefundRequests} = useBulkPickMeSellerRefundRequests();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const newRefundActions: TableActionType[] = [
    {
      text: '수거완료',
      onClick: async (ids: number[]) => {
        if (
          !ids.every((id) => {
            const record = tableData.find((row) => row.id === id);
            return record.status === RefundRequestStatus.Requested;
          })
        ) {
          message.warning('수거중인 요청만 완료처리할 수 있습니다.');
          return;
        }

        await bulkPickMeSellerRefundRequests(ids);
      },
    },
    {
      text: '반품완료',
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            `반품 일괄 처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.`,
          );
          return;
        }

        if (
          !ids.every(
            (id) =>
              tableData.find((record) => record.id === id).status ===
              RefundRequestStatus.Picked,
          )
        ) {
          message.warning('수거 완료된 요청만 반품 완료처리할 수 있습니다.');
          return;
        }

        setSelectedRecord(tableData.find((record) => record.id === ids[0]));
        setIsModalOpen(true);
      },
    },
  ];
  return (
    <>
      <Header title={title} subTitle={subTitle} />
      <Preview
        data={refundRequestPreviewData}
        usePreviewData={useRefundRequestPreview}
      />
      <Filter title={title} inputs={refundRequestInputs} />
      <Table
        title={title}
        columns={refundRequestColumns}
        actions={newRefundActions}
      />
      <RefundConfirmModal
        record={selectedRecord}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
    </>
  );
}

export default RefundRequestsBoard;
