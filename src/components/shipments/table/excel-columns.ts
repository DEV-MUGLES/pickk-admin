import {generateExcelColumns, renderDateWithTime} from '@src/common/helpers';
import {placementsExcelValueMapper} from '@components/placements';
import {FlattenShipmentDataType} from '@containers/shipments/hooks';

import {shipmentsColumns} from './columns';

export const shipmentsExcelValueMapper: Record<
  string,
  (record: FlattenShipmentDataType) => string
> = {
  ...placementsExcelValueMapper,
  shippingAt: ({shippingAt}) => renderDateWithTime(shippingAt),
};

export const shipmentsExcelColumns =
  generateExcelColumns<FlattenShipmentDataType>(
    shipmentsColumns,
    shipmentsExcelValueMapper,
    ['trackingViewUrl'],
  );
