import {getTimeString} from '@src/common/helpers/date';
import {addDashToPhoneNumber} from '@src/common/helpers/PhoneNumberParser';

import {ExchangeRequest} from '@src/types';

export const parseTable = (table: ExchangeRequest[]) =>
  table ? table.map((record) => parseRecord(record)) : null;

export const parseRecord = (record: ExchangeRequest) => {
  const result = {
    ...record,
    paidAt: getTimeString(record.paidAt),
    requestedAt: getTimeString(record.requestedAt),
    confirmedAt: getTimeString(record.confirmedAt),
    options: record.options.join(','),
    exchangeOptions: record.exchangeOptions.join(','),
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
