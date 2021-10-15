import {removeDashFromNumber} from '../NumberParser';

describe('NumberParser', () => {
  it('removeDashFromNumber', () => {
    expect(removeDashFromNumber('')).toBe(undefined);
    expect(removeDashFromNumber(null)).toBe(undefined);
    expect(removeDashFromNumber('ab-1s234-')).toBe('ab-1s234-');
    expect(removeDashFromNumber('ab1s234')).toBe('ab1s234');

    expect(removeDashFromNumber('010-1234-5678')).toBe('01012345678');
    expect(removeDashFromNumber('010-1234-')).toBe('0101234');
    expect(removeDashFromNumber('0--')).toBe('0');
    expect(removeDashFromNumber('---')).toBe('---');
  });
});
