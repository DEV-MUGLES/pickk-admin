import dayjs from 'dayjs';

export const QuickButtonValues = [
  'today',
  'oneWeek',
  'oneMonth',
  'threeMonth',
  'sixMonth',
];
export type QuickButtonValue = typeof QuickButtonValues[number];
export const quickBtnValue2Name = (value: QuickButtonValue): string =>
  ({
    today: '오늘',
    oneWeek: '1주일',
    oneMonth: '1개월',
    threeMonth: '3개월',
    sixMonth: '6개월',
  }[value]);
export const quickBtnValue2StartDate = (value: QuickButtonValue): string =>
  ({
    today: dayjs().format('YYYY-MM-DD'),
    oneWeek: dayjs().subtract(1, 'week').format('YYYY-MM-DD'),
    oneMonth: dayjs().subtract(1, 'month').format('YYYY-MM-DD'),
    threeMonth: dayjs().subtract(3, 'month').format('YYYY-MM-DD'),
    sixMonth: dayjs().subtract(6, 'month').format('YYYY-MM-DD'),
  }[value]);

export type DatePickerProps = {
  name: string;
  select?: Array<{name: string; value: string}>;
  defaultQuickButtonValue?: QuickButtonValue;
};
