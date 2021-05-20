import React from 'react';

import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext} from '@src/contexts/Board';
import {BoardProps} from '../props';

import {itemInputs} from './inputs';
import {itemColumns, itemActions} from './table';

import {ITEMS_QUERY} from '@src/operations/Item/query';

function ItemBoard({title}: BoardProps) {
  return (
    <>
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table title={title} columns={itemColumns} actions={itemActions} />
    </>
  );
}

export default withBoardContext(
  ItemBoard,
  {},
  {
    gql: ITEMS_QUERY.gql,
    dataName: ITEMS_QUERY.dataName,
    filterName: 'itemFilter',
  },
  (v) => v,
);
