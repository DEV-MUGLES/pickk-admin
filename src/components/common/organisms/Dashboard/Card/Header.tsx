import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';

import CardReloadButton, {
  CardReloadButtonProps,
} from '@src/components/common/molecules/button/CardReload';
import {GREY} from '@src/common/constants/colors';

export type DashboardCardHeaderProps = {
  title: string;
} & Partial<CardReloadButtonProps>;

export default function DashboardCardHeader(props: DashboardCardHeaderProps) {
  const partialCardReloadButtonProps: Partial<CardReloadButtonProps> = props;
  const cardReloadButtonProps =
    partialCardReloadButtonProps as CardReloadButtonProps;
  return (
    <Wrapper>
      <StyledText strong>{props.title}</StyledText>
      {cardReloadButtonProps && <CardReloadButton {...cardReloadButtonProps} />}
    </Wrapper>
  );
}

const Wrapper = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: fit-content;
  padding-bottom: 10px;
  border-bottom: 1px solid ${GREY[200]};
`;

const StyledText = styled(Typography.Text)`
  font-size: 16px;
`;
