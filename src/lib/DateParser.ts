import {addLeadingZeros} from './NumberParser';

export const getDateTimeNumbers = () => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    hours: today.getHours(),
    minutes: today.getMinutes(),
    seconds: today.getSeconds(),
  };
};

export const getDateTimeStrings = () => {
  const today = new Date();
  const parse = (num: number) => addLeadingZeros(num, 2);
  return {
    year: today.getFullYear().toString(),
    month: parse(today.getMonth() + 1),
    day: parse(today.getDate()),
    hours: parse(today.getHours()),
    minutes: parse(today.getMinutes()),
    seconds: parse(today.getSeconds()),
  };
};
