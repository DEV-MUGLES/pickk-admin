import {addLeadingZeros} from './NumberParser';
import moment from 'moment';

export const getDateTimeNumbers = (input?: number) => {
  const date = new Date(input);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds(),
  };
};

export const getDateTimeStrings = (input?: number | Date) => {
  const date = new Date(input);
  const parse = (num: number) => addLeadingZeros(num, 2);
  return {
    year: date.getFullYear().toString(),
    month: parse(date.getMonth() + 1),
    day: parse(date.getDate()),
    hours: parse(date.getHours()),
    minutes: parse(date.getMinutes()),
    seconds: parse(date.getSeconds()),
  };
};

export const getTimeString = (input?: number | Date) => {
  if (!input) {
    return '-';
  }
  return moment(input).format('YY/MM/DD hh:mm:ss');
};
