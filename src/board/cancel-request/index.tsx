import moment from 'moment';

import Preview from '@src/components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table, {BoardTableProps} from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext} from '@src/contexts/Board';

import {cancelRequestInputs} from './inputs';
import {canceldRequestPreviewData} from './preview-data';
import {cancelRequestColumns, parseTable} from './table';
import {BoardProps} from '../props';

import {useCancelRequestPreview} from '@src/hooks/ClaimRequest';
import {useCancelRequestTable} from '@src/hooks/table/ClaimRequest';

function CancelRequestBoard({
  title,
}: BoardProps & Omit<BoardTableProps, 'columns' | 'actions' | 'footActions'>) {
  return (
    <>
      <Preview
        data={canceldRequestPreviewData}
        usePreviewData={useCancelRequestPreview}
      />
      <Space level={2} />
      <Filter title={title} inputs={cancelRequestInputs} />
      <Space level={2} />
      <Table title={title} columns={cancelRequestColumns} />
      <Space level={2} />
    </>
  );
}

export default withBoardContext(
  CancelRequestBoard,
  {
    status: null,
    lookupDate: 'paid',
    startDate: moment().subtract(1, 'months').format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  useCancelRequestTable,
  parseTable,
);
