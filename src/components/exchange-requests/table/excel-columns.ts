import {FlattenExchangeRequestDataType} from '@containers/exchange-requests/hooks';
import {
  generateExcelColumns,
  renderDateWithTime,
  getExchangeRequestStatusDisplayName,
  getOrderClaimFaultOfDisplayName,
  addDashToPhoneNumber,
} from '@src/common/helpers';

import {exchangeRequestsColumns} from './columns';

export const exchangeRequestsExcelValueMapper: Record<
  string,
  (record: FlattenExchangeRequestDataType) => string
> = {
  status: ({status}) => getExchangeRequestStatusDisplayName(status),
  requestedAt: ({requestedAt}) => renderDateWithTime(requestedAt),
  buyerPhoneNumber: ({buyerPhoneNumber}) =>
    addDashToPhoneNumber(buyerPhoneNumber),
  reason: ({faultOf, reason}) =>
    `[${getOrderClaimFaultOfDisplayName(faultOf)}] ${reason}`,
  receiverPhoneNumber: ({receiverPhoneNumber}) =>
    addDashToPhoneNumber(receiverPhoneNumber),
};

export const exchangeRequestsExcelColumns =
  generateExcelColumns<FlattenExchangeRequestDataType>(
    exchangeRequestsColumns,
    exchangeRequestsExcelValueMapper,
    ['trackingViewUrl'],
  );
