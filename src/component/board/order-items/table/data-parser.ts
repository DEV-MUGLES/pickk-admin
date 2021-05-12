import {getTimeString} from '@src/lib/DateParser';
import {addDashToPhoneNumber} from '@src/lib/PhoneNumberParser';

import {Placement} from '@src/types';

export const parseTable = (table: Placement[]) =>
  table ? table.map((record) => parseRecord(record)) : null;

export const parseRecord = (record: Placement) => {
  const result = {
    ...record,
    paidAt: getTimeString(record.paidAt),
    placedAt: getTimeString(record.placedAt),
    shippedAt: getTimeString(record.shippedAt),
    deliveredAt: getTimeString(record.deliveredAt),
    combinedAddress: `${record.baseAddress} ${record.detailAddress}`,
    options: record.options.join('-'),
    buyerPhone: record.buyerPhone
      ? addDashToPhoneNumber(record.buyerPhone)
      : null,
    addressPhone: record.addressPhone
      ? addDashToPhoneNumber(record.addressPhone)
      : null,
  };
  Object.keys(result).forEach((key) => {
    if (!result[key] || result[key] === undefined) {
      result[key] = '';
    }
  });
  return result;
};
