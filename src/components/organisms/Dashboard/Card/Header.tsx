import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';

import CardReloadButton from '@src/components/molecules/button/CardReload';

export type DashboardCardHeaderProps = {
  title: string;
  time: string;
  onClick: () => void;
};

export default function DashboardCardHeader({
  title,
  time,
  onClick,
}: DashboardCardHeaderProps) {
    return (
    <Wrapper>
        <Typography.Text strong>{title}</Typography.Text>
        <CardReloadButton time={time} onClick={onClick} />
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
`;
