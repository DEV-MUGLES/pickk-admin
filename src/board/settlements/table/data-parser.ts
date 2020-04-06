import moment from 'moment';

import {getTimeString} from '@src/lib/DateParser';
import {Settlement} from '@src/types';

export const parseTable = (table: Settlement[]) =>
  table ? table.map((record) => parseRecord(record)) : null;

export const parseRecord = (record: Settlement) => {
  const result = {
    ...record,
    paidAt: getTimeString(record.paidAt),
    confirmedAt: getTimeString(record.confirmedAt),
    options: record.options.join('-'),
    expectedDate: moment(record.expectedDate).format('YY/MM/DD'),
  };
  Object.keys(result).forEach((key) => {
    if (!result[key] || result[key] === undefined) {
      result[key] = '';
    }
  });
  return result;
};
