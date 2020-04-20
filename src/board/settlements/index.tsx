import Preview from '@src/components/organisms/Board/preview';
import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {settlementInputs} from './inputs';
import {settlementCountPreviewData} from './preview-data';
import {settlementColumns} from './table';
import {BoardProps} from '../props';

import {parseTable} from './table/data-parser';

import {useSettlementTable} from '@src/hooks/table/Settlement';
import {useSettlementCountPreview} from '@src/hooks/Settlement';

import {withBoardContext} from '@src/contexts/Board';
import SettlementAmountPreview from './amount-preview';

function SettlementBoard({title}: BoardProps) {
  return (
    <>
      <Preview
        data={settlementCountPreviewData}
        usePreviewData={useSettlementCountPreview}
      />
      <Space level={2} />
      <Filter title={title} inputs={settlementInputs} />
      <Space level={2} />
      <SettlementAmountPreview />
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
