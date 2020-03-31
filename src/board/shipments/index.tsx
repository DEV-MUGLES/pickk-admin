import moment from 'moment';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {orderItemInputs} from '../order-items/inputs';
import {placementColumns} from '../placement/table';
import {BoardProps} from '../props';

import Preview from '@src/components/organisms/Board/preview';
import {parseTable} from '../order-items/table/data-parser';
import {shipmentPreviewData} from './preview-data';

import {usePlacementTable} from '@src/hooks/table/Placement';
import {useShipmentPreview} from '@src/hooks/Shipment';

import {withBoardContext} from '@src/contexts/Board';

function PlacementBoard({title}: BoardProps) {
  return (
    <>
      <Preview data={shipmentPreviewData} usePreviewData={useShipmentPreview} />
      <Space level={2} />
      <Filter title={title} inputs={orderItemInputs} />
      <Space level={2} />
      <Table title={title} columns={placementColumns} />
    </>
  );
}

export default withBoardContext(
  PlacementBoard,
  {
    status: null,
    lookupDate: 'paid',
    startDate: moment()
      .subtract(1, 'months')
      .format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
  },
  usePlacementTable,
  parseTable,
);
