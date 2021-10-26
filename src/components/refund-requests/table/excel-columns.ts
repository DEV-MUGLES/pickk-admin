import {FlattenRefundRequestDataType} from '@containers/refund-requests/hooks';
import {
  generateExcelColumns,
  renderDateWithTime,
  getRefundRequestStatusDisplayName,
  getOrderClaimFaultOfDisplayName,
  addDashToPhoneNumber,
} from '@src/common/helpers';

import {refundRequestsColumns} from './columns';

export const refundRequestsExcelValueMapper: Record<
  string,
  (record: FlattenRefundRequestDataType) => string
> = {
  status: ({status}) => getRefundRequestStatusDisplayName(status),
  requestedAt: ({requestedAt}) => renderDateWithTime(requestedAt),
  orderItems: ({orderItems}) =>
    orderItems
      .map(
        (currItem) =>
          `${currItem.itemName} (${currItem.productVariantName} x ${currItem.quantity})`,
      )
      .join(', '),
  buyerPhoneNumber: ({buyerPhoneNumber}) =>
    addDashToPhoneNumber(buyerPhoneNumber),
  reason: ({faultOf, reason}) =>
    `[${getOrderClaimFaultOfDisplayName(faultOf)}] ${reason}`,
};

export const refundRequestsExcelColumns =
  generateExcelColumns<FlattenRefundRequestDataType>(
    refundRequestsColumns,
    refundRequestsExcelValueMapper,
    ['trackingViewUrl'],
  );
