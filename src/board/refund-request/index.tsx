import moment from 'moment';

import Preview from '@src/components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext} from '@src/contexts/Board';

import {refundRequestInputs} from './inputs';
import {refundRequestPreviewData} from './preview-data';
import {refundRequestColumns, refundRequestActions, parseTable} from './table';
import {BoardProps} from '../props';

import {useRefundRequestPreview} from '@src/hooks/ClaimRequest';
import {useRefundRequestTable} from '@src/hooks/table/ClaimRequest';

function RefundRequestBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
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
        actions={refundRequestActions}
      />
      <Space level={2} />
    </>
  );
}

export default withBoardContext(
  RefundRequestBoard,
  {
    status: 'REFUND_REQUESTED',
    lookupDate: 'paid',
    startDate: moment()
      .subtract(1, 'months')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  useRefundRequestTable,
  parseTable,
);
