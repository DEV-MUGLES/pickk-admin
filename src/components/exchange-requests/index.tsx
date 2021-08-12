import {message} from 'antd';
import {useState} from 'react';

import Header from '@src/components/common/organisms/Board/Header';
import Preview from '@src/components/common/organisms/Board/preview';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';
import ShipModal from '../placement/table/modal/ship';

import {useBoardContext} from '@src/common/contexts/Board';
import ExchangeRequestService from '@src/lib/services/ExchangeRequest';
import {PickingStatus, ExchangeStatus} from '@src/types';
import {TableActionType} from '../common/organisms/Board/Table/table';
import {BoardProps} from '../props';

import {useMeSellerExchangeRequestsCount} from './hooks';

import {exchangeRequestInputs} from './inputs';
import {exchangeRequestPreviewData} from './preview-data';
import {exchangeRequestColumns, exchangeRequestActions} from './table';

function ExchangeRequestsBoard(props: BoardProps) {
  const {state} = useBoardContext();
  const {tableData, selectedRowKeys} = state;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalData = tableData
    ? tableData.filter((data) => selectedRowKeys.includes(data.id))
    : null;

  const newExchangeActions: TableActionType[] = [
    {
      text: '수거완료',
      onClick: async (ids: number[]) => {
        if (
          !ids.every((id) => {
            const record = tableData.find((row) => row.id === id);
            return (
              record.exchangeStatus === PickingStatus.Picking ||
              record.exchangeStatus === ExchangeStatus.ExchangeRequested
            );
          })
        ) {
          message.warning('수거중인 요청만 완료처리할 수 있습니다.');
          return;
        }

        try {
          await ExchangeRequestService.pick(ids);
        } catch (err) {
          message.error('실패했습니다. - ' + err);
        }
      },
    },
    {
      text: '재발송처리',
      onClick: async (ids: number[]) => {
        setIsModalOpen(true);
      },
    },
    ...exchangeRequestActions,
  ];

  return (
    <>
      <Header {...props} />
      <Preview
        data={exchangeRequestPreviewData}
        usePreviewData={useMeSellerExchangeRequestsCount}
      />
      <Filter {...props} inputs={exchangeRequestInputs} />
      <Table
        {...props}
        columns={exchangeRequestColumns}
        actions={newExchangeActions}
      />
      <ShipModal {...{modalData, isModalOpen, closeModal}} />
    </>
  );
}

export default ExchangeRequestsBoard;
