import Preview from '@src/components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {settlementInputs} from './inputs';
import {settlementPreviewData} from './preview-data';
import {settlementColumns} from './table';
import {BoardProps} from '../props';

import {parseTable} from './table/data-parser';

import {useSettlementTable} from '@src/hooks/table/Settlement';
import {useSettlementtPreview} from '@src/hooks/Settlement';

import {withBoardContext} from '@src/contexts/Board';

function SettlementBoard({title}: BoardProps) {
  return (
    <>
      <Preview
        data={settlementPreviewData}
        usePreviewData={useSettlementtPreview}
      />
      <Space level={2} />
      <Filter title={title} inputs={settlementInputs} />
      <Space level={2} />
      <Table title={title} columns={settlementColumns} />
    </>
  );
}

export default withBoardContext(
  SettlementBoard,
  {
    expected: null,
    settleStatus: null,
  },
  useSettlementTable,
  parseTable,
);
