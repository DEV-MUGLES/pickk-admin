// @TODO : object 관련 코드 다른 모듈로 분리

export const isEqualObject = (a, b): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return (
    Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((key) => a[key] === b[key])
  );
};

export const isEqualSizeObject = (a, b): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return Object.keys(a).length === Object.keys(b).length;
};

export const isEqualArray = <T = unknown>(
  a: T[],
  b: T[],
  compare?,
): boolean => {
  if (!a && !b) return true;
  if (!a || !b) return false;
  if (a.length !== b.length) {
    return false;
  }
  return a.every((_, i) => (compare ? compare(a[i], b[i]) : a[i] === b[i]));
};

export const range = (start: number, end: number) =>
  [...Array(end - start).keys()].map((i) => i + start);

const Util = {
  isEqualObject,
  isEqualSizeObject,
  isEqualArray,
  range,
};

export default Util;

export * from './alias';
export * from './Cookies';
export * from './date';
export * from './NumberParser';
export * from './PhoneNumberParser';
export * from './sorter';
export * from './Url';
