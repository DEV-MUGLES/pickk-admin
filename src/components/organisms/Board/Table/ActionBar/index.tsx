import React from 'react';
import styled from 'styled-components';

import TableActionButton from './action-button';
import Space from '@src/components/atoms/space';
import {TableActionType} from '../table';

import {isEqualArray} from '@src/lib/utils';
import TablePageSizeSelect, {
  TablePageSizeSelectProps,
} from '@src/components/molecules/select/table-page-size';

export type TableActionBarProps = {
  selectedRowKeys: number[];
  tableActions?: TableActionType[];
} & TablePageSizeSelectProps;

function TableActionBar(props: TableActionBarProps) {
  const {selectedRowKeys, tableActions} = props;

  return (
    <Wrapper>
      {tableActions.map((tableAction, index) => (
        <React.Fragment key={'action_' + index}>
          {tableAction.Component ? (
            <tableAction.Component />
          ) : (
            <TableActionButton
              selectedRowKeys={selectedRowKeys}
              tableAction={tableAction}
            />
          )}
          <Space direction="ROW" />
        </React.Fragment>
      ))}
      <TablePageSizeSelect {...(props as TablePageSizeSelectProps)} />
    </Wrapper>
  );
}

export default React.memo(
  TableActionBar,
  (prev, next) =>
    isEqualArray(prev.selectedRowKeys, next.selectedRowKeys) &&
    prev.pageSize === next.pageSize,
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
