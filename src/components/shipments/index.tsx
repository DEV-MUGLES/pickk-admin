import dayjs from 'dayjs';

import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';
import Space from '@src/components/common/atoms/space';

import {orderItemInputs} from '../order-items/inputs';
import {placementColumns} from '../placement/table';
import {BoardProps} from '../props';

import Preview from '@src/components/common/organisms/Board/preview';
import {parseTable} from '../order-items/table/data-parser';
import {shipmentPreviewData} from './preview-data';

import {usePlacementTable} from '@src/common/hooks/table/Placement';
import {useShipmentPreview} from '@src/common/hooks/Shipment';

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

export default PlacementBoard;
