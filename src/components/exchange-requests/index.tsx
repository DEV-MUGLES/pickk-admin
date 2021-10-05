import {message} from 'antd';
import {useState} from 'react';
import {ExchangeRequestStatus} from '@pickk/common';

import Header from '@src/components/common/organisms/Board/Header';
import Preview from '@src/components/common/organisms/Board/preview';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';
import ShipModal, {ShipModalDataType} from '../placements/table/modal/ship';

import {useBoardContext} from '@src/common/contexts/Board';
import {TableActionType} from '../common/organisms/Board/Table/table';
import {BoardProps} from '../props';

import {
  useExchangeRequestPreview,
  useBulkPickMeSellerExchangeRequests,
  useReshipMeSellerOrderItem,
} from './hooks';

import {exchangeRequestPreviewData} from './preview-data';
import {exchangeRequestInputs} from './inputs';
import {
  exchangeRequestColumns,
  exchangeRequestActions,
  exchangeRequestExcelColumns,
} from './table';

function ExchangeRequestsBoard(props: BoardProps) {
  const {state} = useBoardContext();
  const {tableData, selectedRowKeys} = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {bulkPickMeSellerExchangeRequests} =
    useBulkPickMeSellerExchangeRequests();
  const {reshipMeSellerExchangeRequest} = useReshipMeSellerOrderItem();

  const newExchangeActions: TableActionType[] = [
    {
      text: '수거완료',
      onClick: async (merchantUids: string[]) => {
        if (
          !merchantUids.every((merchantUid) => {
            const record = tableData.find(
              (record) => record.merchantUid === merchantUid,
            );
            return record.status === ExchangeRequestStatus.Requested;
          })
        ) {
          message.warning('수거중인 요청만 완료처리할 수 있습니다.');
          return;
        }

        try {
          await bulkPickMeSellerExchangeRequests(merchantUids);
          message.success('수거 완료되었습니다.');
        } catch (error) {
          message.error(`실패했습니다. - ${error}`);
        }
      },
    },
    {
      text: '교환품재발송',
      onClick: async (ids: number[]) => {
        if (ids.length !== 1) {
          message.warning(
            '일괄 재발송처리는 지원하지 않습니다.\n1개의 주문건만 선택해주세요.',
          );
          return;
        }
        setIsModalOpen(true);
      },
    },
    ...exchangeRequestActions,
  ];

  const getModalData = (): ShipModalDataType => {
    const selectedData = tableData?.find(
      (data) => selectedRowKeys[0] === data.id,
    );
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
      <Header {...props} />
      <Preview
        data={exchangeRequestPreviewData}
        usePreviewData={useExchangeRequestPreview}
      />
      <Filter {...props} inputs={exchangeRequestInputs} />
      <Table
        {...props}
        columns={exchangeRequestColumns}
        excelColumns={exchangeRequestExcelColumns}
        actions={newExchangeActions}
      />
      <ShipModal
        title="재발송처리"
        {...{
          modalData: getModalData(),
          onSubmit: async (shipment) => {
            try {
              await reshipMeSellerExchangeRequest(
                shipment.merchantUid,
                shipment.courierId,
                shipment.trackCode,
              );

              message.success('적용되었습니다.');
            } catch (error) {
              message.error(`실패했습니다. - ${error}`);
            }
          },
          isModalOpen,
          closeModal,
        }}
      />
    </>
  );
}

export default ExchangeRequestsBoard;
