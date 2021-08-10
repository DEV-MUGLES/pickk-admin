import dayjs from 'dayjs';

import Preview from '@src/components/common/organisms/Board/preview';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table, {
  BoardTableProps,
} from '@src/components/common/organisms/Board/Table';
import Space from '@src/components/common/atoms/space';

import {cancelRequestInputs} from './inputs';
import {canceldRequestPreviewData} from './preview-data';
import {cancelRequestColumns, parseTable} from './table';
import {BoardProps} from '../props';

import {useCancelRequestPreview} from '@src/common/hooks/ClaimRequest';
import {useCancelRequestTable} from '@src/common/hooks/table/ClaimRequest';

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

export default CancelRequestBoard;
