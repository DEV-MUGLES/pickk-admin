import React from 'react';

export type RenderType = (
  value: any,
  record: any,
  index: number,
) => React.ReactNode;

export const renderBooleanColumn: RenderType = (text, _record, _index) => (
  <>{text === true ? 'O' : 'X'}</>
);
