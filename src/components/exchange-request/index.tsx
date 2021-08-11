import Preview from '@src/components/common/organisms/Board/preview';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table, {
  BoardTableProps,
} from '@src/components/common/organisms/Board/Table';
import Space from '@src/components/common/atoms/space';

import {useBoardContext} from '@src/common/contexts/Board';

import {exchangeRequestInputs} from './inputs';
import {exchangeRequestPreviewData} from './preview-data';
import {
  exchangeRequestColumns,
  exchangeRequestActions,
  parseTable,
} from './table';
import {BoardProps} from '../props';

import {useExchangeRequestPreview} from '@src/common/hooks/ClaimRequest';
import {useExchangeRequestTable} from '@src/common/hooks/table/ClaimRequest';
import {message} from 'antd';
import ExchangeRequestService from '@src/lib/services/ExchangeRequest';
import {PickingStatus, ExchangeStatus} from '@src/types';
import {useState} from 'react';
import ShipModal from '../placement/table/modal/ship';
import {TableActionType} from '../common/organisms/Board/Table/table';

function ExchangeRequestBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
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
      <Preview
        data={exchangeRequestPreviewData}
        usePreviewData={useExchangeRequestPreview}
      />
      <Space level={2} />
      <Filter title={title} inputs={exchangeRequestInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={exchangeRequestColumns}
        actions={newExchangeActions}
      />
      <Space level={2} />
      <ShipModal {...{modalData, isModalOpen, closeModal}} />
    </>
  );
}

export default ExchangeRequestBoard;
