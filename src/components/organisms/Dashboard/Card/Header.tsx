import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';

import CardReloadButton, {CardReloadButtonProps} from '@src/components/molecules/button/CardReload';

export type DashboardCardHeaderProps = {
  title: string;
} & CardReloadButtonProps;

export default function DashboardCardHeader(
  props: DashboardCardHeaderProps,
) {
    const cardReloadButtonProps: CardReloadButtonProps = props;
    return (
    <Wrapper>
        <Typography.Text strong>{props.title}</Typography.Text>
        <CardReloadButton {...cardReloadButtonProps} />
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
