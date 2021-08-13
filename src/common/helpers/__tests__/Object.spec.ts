import dayjs from 'dayjs';

import {parseRecordWithDeepKey} from '../Object';

describe('Object', () => {
  it('parseRecordWithDeepKey', () => {
    expect(JSON.stringify(parseRecordWithDeepKey(null, 'asdfas'))).toBe('{}');
    expect(JSON.stringify(parseRecordWithDeepKey('hi', null))).toBe(
      '{"hi":null}',
    );

    expect(JSON.stringify(parseRecordWithDeepKey('a.b.c.d', 'value'))).toBe(
      '{"a":{"b":{"c":{"d":"value"}}}}',
    );
    const startDate = dayjs().subtract(1, 'week').format('YYYY-MM-DD');
    const endDate = dayjs().format('YYYY-MM-DD');
    expect(
      JSON.stringify(
        parseRecordWithDeepKey('order.paidAtBetween', [startDate, endDate]),
      ),
    ).toBe(`{"order":{"paidAtBetween":["${startDate}","${endDate}"]}}`);
    expect(JSON.stringify(parseRecordWithDeepKey('a', 'value'))).toBe(
      '{"a":"value"}',
    );
  });
});
