import {useState} from 'react';
import {message} from 'antd';
import {RefundRequestStatus} from '@pickk/common';

import RefundConfirmModal from './table/modal/confirm';
import ExchangeRequestModal from '../order-items/table/modal/exchangeRequest';
import Preview from '@src/components/common/organisms/Board/preview';
import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {useBoardContext} from '@src/common/contexts/Board';

import {refundRequestInputs} from './inputs';
import {refundRequestPreviewData} from './preview-data';
import {refundRequestColumns, refundRequestActions} from './table';
import {BoardProps} from '../props';

import {TableActionType} from '@src/components/common/organisms/Board/Table/table';
import {useRefundRequestPreview} from '@src/common/hooks/ClaimRequest';

import {useBulkPickMeSellerRefundRequests} from './hooks';

function RefundRequestsBoard({title, subTitle}: BoardProps) {
  const {state} = useBoardContext();
  const {tableData} = state;

  const {bulkPickMeSellerRefundRequests} = useBulkPickMeSellerRefundRequests();

  const [exchangeRequestIds, setExchangeRequestIds] = useState({
    id: -1,
    itemId: -1,
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const [isExchangeRequestModalOpen, setIsExchangeRequestModalOpen] =
    useState(false);
  const closeExchangeRequestModal = () => {
    setIsExchangeRequestModalOpen(false);
  };

  const newRefundActions: TableActionType[] = [
    {
      text: '수거완료',
      onClick: async (ids: number[]) => {
        if (
          !ids.every((id) => {
            const record = tableData.find((row) => row.id === id);
            return record.status === RefundRequestStatus.Picked;
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
    ...refundRequestActions,
    {
      text: '교환으로 변경',
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            `교환으로 변경 일괄 처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.`,
          );
          return;
        }

        const record = tableData.find((row) => row.id === ids[0]);
        if (record.items.length !== 1) {
          message.warning(
            `여러개의 아이템에 대한 주문건을 교환으로 변경할 수 없습니다.`,
          );
          return;
        }

        setExchangeRequestIds({
          id: ids[0],
          itemId: record.items[0].id,
        });
        setIsExchangeRequestModalOpen(true);
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
      <ExchangeRequestModal
        {...exchangeRequestIds}
        {...{
          isModalOpen: isExchangeRequestModalOpen,
          closeModal: closeExchangeRequestModal,
        }}
        claimed={true}
      />
    </>
  );
}

export default RefundRequestsBoard;
