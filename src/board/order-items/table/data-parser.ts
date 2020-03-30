import {getDateTimeStrings} from '@src/lib/DateParser';
import {addDashToPhoneNumber} from '@src/lib/PhoneNumberParser';

import {Placement} from '@src/types';

export const parseTable = (table: Placement[]) =>
  table ? table.map(record => parseRecord(record)) : null;

export const parseRecord = (record: Placement) => {
  const {year, month, day} = getDateTimeStrings(
    new Date(record.paidAt).getTime(),
  );
  const result = {
    ...record,
    paidAt: `${year}.${month}.${day}`,
    placedAt: `${year}.${month}.${day}`,
    shippedAt: `${year}.${month}.${day}`,
    deliveredAt: `${year}.${month}.${day}`,
    options: record.options.join('-'),
    buyerPhone: record.buyerPhone
      ? addDashToPhoneNumber(record.buyerPhone)
      : null,
    addressPhone: record.addressPhone
      ? addDashToPhoneNumber(record.addressPhone)
      : null,
  };
  Object.keys(result).forEach(key => {
    if (!result[key] || result[key] === undefined) {
      result[key] = '';
    }
  });
  return result;
};
