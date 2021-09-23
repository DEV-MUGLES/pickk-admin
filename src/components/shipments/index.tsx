import Preview from '@src/components/common/organisms/Board/preview';
import Header from '@src/components/common/organisms/Board/Header';
import Filter from '@src/components/common/organisms/Board/Filter';
import Table from '@src/components/common/organisms/Board/Table';

import {orderItemInputs} from '../order-items/inputs';
import {shipmentsColumns} from './table/columns';
import {BoardProps} from '../props';
import {TableActionType} from '../common/organisms/Board/Table/table';

import {useShipmentPreview} from './hooks';

import {shipmentPreviewData} from './preview-data';

function ShipmentBoard(props: BoardProps) {
  const placementActions: TableActionType[] = [{text: '송장수정'}];

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
