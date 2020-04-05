import moment from 'moment';

import Preview from '@src/components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext, useBoardContext} from '@src/contexts/Board';

import {refundRequestInputs} from './inputs';
import {refundRequestPreviewData} from './preview-data';
import {refundRequestColumns, refundRequestActions, parseTable} from './table';
import {BoardProps} from '../props';

import {useRefundRequestPreview} from '@src/hooks/ClaimRequest';
import {useRefundRequestTable} from '@src/hooks/table/ClaimRequest';
import {PickingStatus, RefundStatus} from '@src/types';
import RefundRequestService from '@src/lib/services/RefundRequest';
import {message} from 'antd';

function RefundRequestBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  const {state} = useBoardContext();
  const {tableData} = state;

  const newRefundActions = [
    {
      text: '수거완료',
      onClick: async (ids: number[]) => {
        if (
          !ids.every((id) => {
            const record = tableData.find((row) => row.id === id);
            return (
              record.refundStatus === PickingStatus.Picking ||
              record.refundStatus === RefundStatus.RefundRequested
            );
          })
        ) {
          message.warning('수거중인 요청만 완료처리할 수 있습니다.');
          return Promise.resolve(false);
        }
        try {
          await RefundRequestService.pick(ids);
          return Promise.resolve(true);
        } catch (err) {
          message.error('실패했습니다. - ' + err);
          return Promise.resolve(false);
        }
      },
    },
    {
      text: '반품완료',
      onClick: async (ids: number[]) => {
        if (
          !ids.every(
            (id) =>
              tableData.find((record) => record.id === id).refundStatus ===
              PickingStatus.Picked,
          )
        ) {
          message.warning('수거 완료된 요청만 반품 완료처리할 수 있습니다.');
          return Promise.resolve(false);
        }
        try {
          await RefundRequestService.confirm(ids);
          return Promise.resolve(true);
        } catch (err) {
          message.error('실패했습니다. - ' + err);
          return Promise.resolve(false);
        }
      },
    },
    ...refundRequestActions,
  ];
  return (
    <>
      <Preview
        data={refundRequestPreviewData}
        usePreviewData={useRefundRequestPreview}
      />
      <Space level={2} />
      <Filter title={title} inputs={refundRequestInputs} />
      <Space level={2} />
      <Table
        title={title}
        columns={refundRequestColumns}
        actions={newRefundActions}
      />
      <Space level={2} />
    </>
  );
}

export default withBoardContext(
  RefundRequestBoard,
  {
    status: 'REQUESTED',
    lookupDate: 'paid',
    startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  useRefundRequestTable,
  parseTable,
);
