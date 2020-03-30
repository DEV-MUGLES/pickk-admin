import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';

import {TableActionType} from './table';
import Space from '@src/components/atoms/space';
import {isEqualArray} from '@src/lib/utils';

export type TableFooterProps = {
  selectedRowKeys: number[];
  footActions?: TableActionType[];
};

function TableFooter({selectedRowKeys, footActions}: TableFooterProps) {
  return (
    <Wrapper>
      {footActions.map((item, index) => (
        <>
          <Button
            disabled={selectedRowKeys.length === 0}
            key={index}
            icon={item.icon}
            onClick={() => item.onClick(selectedRowKeys)}>
            {item.text}
          </Button>
          <Space direction="ROW" />
        </>
      ))}
    </Wrapper>
  );
}
export default React.memo(TableFooter, (prev, next) =>
  isEqualArray(prev.selectedRowKeys, next.selectedRowKeys),
);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;
`;
