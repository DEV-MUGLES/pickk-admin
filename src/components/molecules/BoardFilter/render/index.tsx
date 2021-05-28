import React from 'react';
import dayjs from 'dayjs';

export type ColumnRendererType<ValueType = any> = (
  value: ValueType,
  record?: any,
  index?: number,
) => React.ReactNode;

export const renderBooleanColumn: ColumnRendererType<boolean> = (value) => (
  <>{value === true ? '✅' : '❌'}</>
);

export const renderDateColumn: ColumnRendererType<string> = (value) => (
  <>{dayjs(value).format('YYYY/MM/DD')}</>
);
