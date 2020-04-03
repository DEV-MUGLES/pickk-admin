import moment from 'moment';

import Preview from '@src/components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext, useBoardContext} from '@src/contexts/Board';

import {exchangeRequestInputs} from './inputs';
import {exchangeRequestPreviewData} from './preview-data';
import {
  exchangeRequestColumns,
  exchangeRequestActions,
  parseTable,
} from './table';
import {BoardProps} from '../props';

import {useExchangeRequestPreview} from '@src/hooks/ClaimRequest';
import {useExchangeRequestTable} from '@src/hooks/table/ClaimRequest';
import {message} from 'antd';
import ExchangeRequestService from '@src/lib/services/ExchangeRequest';
import {PickingStatus} from '@src/types';

function ExchangeRequestBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  const {tableData} = useBoardContext().state;

  const newExchangeActions = [
    {
      text: '수거완료',
      onClick: async (ids: number[]) => {
        if (
          !ids.every(
            id =>
              tableData.find(record => record.id === id).exchangeStatus ===
              PickingStatus.Picking,
          )
        ) {
          message.warning('수거 중인 요청만 완료처리할 수 있습니다.');
          return Promise.resolve(false);
        }
        await ExchangeRequestService.pick(ids);
        return Promise.resolve(true);
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
    </>
  );
}

export default withBoardContext(
  ExchangeRequestBoard,
  {
    status: 'EXCHANGE_REQUESTED',
    lookupDate: 'paid',
    startDate: moment()
      .subtract(1, 'months')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  useExchangeRequestTable,
  parseTable,
);
