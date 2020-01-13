import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import Space from '@src/components/atoms/space';
import {TableActionType} from './table';

export type TableActionBarProps = {
  selectedRowKeys: number[];
  actions?: TableActionType[];
};

export default function TableActionBar({
  selectedRowKeys,
  actions,
}: TableActionBarProps) {
  return (
    <Wrapper>
      {actions.map((item, index) => (
        <React.Fragment key={'action_' + index}>
          <Button
            disabled={selectedRowKeys.length === 0}
            key={index}
            icon={item.icon}
            onClick={() => item.onClick(selectedRowKeys)}>
            {item.text}
          </Button>
          <Space direction="ROW" />
        </React.Fragment>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
