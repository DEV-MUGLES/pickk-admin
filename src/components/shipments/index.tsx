import Preview from '@src/components/common/organisms/Board/preview';
import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {orderItemInputs} from '../order-items/inputs';
import {shipmentsColumns} from './table/columns';
import {BoardProps} from '../props';
import {TableActionType} from '../common/organisms/Board/Table/table';

import {parseTable} from '../order-items/table/data-parser';
import {shipmentPreviewData} from './preview-data';

import {useShipmentPreview} from '@src/common/hooks/Shipment';

function ShipmentBoard(props: BoardProps) {
  const placementActions: TableActionType[] = [
    {text: '송장수정'},
    {text: '직접반품'},
    {text: '직접교환'},
  ];

  return (
    <>
      <Header {...props} />
      <Preview data={shipmentPreviewData} usePreviewData={useShipmentPreview} />
      <Filter {...props} inputs={orderItemInputs} />
      <Table {...props} columns={shipmentsColumns} actions={placementActions} />
    </>
  );
}

export default ShipmentBoard;
