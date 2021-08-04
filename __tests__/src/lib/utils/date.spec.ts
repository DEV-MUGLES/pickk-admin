import dayjs from 'dayjs';

describe('date utils', () => {
  it('dayjs use local timezone', () => {
    expect(dayjs().format()).toEqual(dayjs(new Date()).format());
  });

  it('startOf day across timezones', () => {
    const expectedDay = new Date().setHours(0, 0, 0, 0);
    const startOfDay = dayjs().startOf('day');
    expect(startOfDay.format()).toEqual(dayjs(expectedDay).format());
  });

  it('endOf day across timezones', () => {
    const expectedDay = new Date().setHours(23, 59, 59, 999);
    const endOfDay = dayjs().endOf('day');
    expect(endOfDay.format()).toEqual(dayjs(expectedDay).format());
  });
});
