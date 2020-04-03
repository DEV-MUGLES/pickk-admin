import React from 'react';
import styled from 'styled-components';
import {message, Button} from 'antd';

import Space from '@src/components/atoms/space';
import {TableActionType} from './table';

import {useBoardContext} from '@src/contexts/Board';
import {isEqualArray} from '@src/lib/utils';
import TablePageSizeSelect, {
  TablePageSizeSelectProps,
} from '@src/components/molecules/select/table-page-size';

export type TableActionBarProps = {
  selectedRowKeys: number[];
  actions?: TableActionType[];
} & TablePageSizeSelectProps;

function TableActionBar(props: TableActionBarProps) {
  const {selectedRowKeys, actions} = props;

  const {reload} = useBoardContext().action;

  return (
    <Wrapper>
      {actions.map((item, index) => (
        <React.Fragment key={'action_' + index}>
          {item.Component ? (
            <item.Component />
          ) : (
            <>
              <Button
                disabled={selectedRowKeys.length === 0}
                key={index}
                icon={item.icon}
                onClick={async () => {
                  try {
                    const result = await item.onClick(selectedRowKeys);
                    if (result) {
                      reload();
                    }
                  } catch (err) {
                    message.error('실패! - ' + err);
                  }
                }}>
                {item.text}
              </Button>
            </>
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
  width: 100%;
`;
