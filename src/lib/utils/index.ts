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

export const isEqualArray = (a: any[], b: any[], compare?): boolean => {
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

export * from './Cookies';
