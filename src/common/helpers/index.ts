export const range = (start: number, end: number) =>
  [...Array(end - start).keys()].map((i) => i + start);

export * from './alias';
export * from './Array';
export * from './ColumnRenderer';
export * from './Cookies';
export * from './date';
export * from './NumberParser';
export * from './Object';
export * from './PhoneNumberParser';
export * from './sorter';
export * from './Url';
