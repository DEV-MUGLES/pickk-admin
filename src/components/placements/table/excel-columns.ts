import {FlattenPlacementDataType} from '@containers/placements/hooks';
import {
  generateExcelColumns,
  addDashToPhoneNumber,
  getOrderItemStatusDisplayName,
  renderDateWithTime,
} from '@src/common/helpers';

import {placementsColumns} from './columns';

export const placementsExcelValueMapper: Record<
  string,
  (record: FlattenPlacementDataType) => string
> = {
  paidAt: ({paidAt}) => renderDateWithTime(paidAt),
  confirmedAt: ({confirmedAt}) => renderDateWithTime(confirmedAt),
  status: ({status, isConfirmed}) =>
    getOrderItemStatusDisplayName(status, isConfirmed),
  buyerPhoneNumber: ({buyerPhoneNumber}) =>
    addDashToPhoneNumber(buyerPhoneNumber),
  receiverPhoneNumber: ({receiverPhoneNumber}) =>
    addDashToPhoneNumber(receiverPhoneNumber),
};

export const placementsExcelColumns =
  generateExcelColumns<FlattenPlacementDataType>(
    placementsColumns,
    placementsExcelValueMapper,
    ['trackingViewUrl'],
  );
