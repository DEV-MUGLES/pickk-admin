import React from 'react';

export type ColumnRendererType<ValueType = any> = (
  value: ValueType,
  record?: any,
  index?: number,
) => React.ReactNode;

export const renderBooleanColumn: ColumnRendererType<boolean> = (value) => (
  <>{value === true ? '✅' : '❌'}</>
);
