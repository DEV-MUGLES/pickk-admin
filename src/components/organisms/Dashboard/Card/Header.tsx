import React from 'react';
import {Typography, Button} from 'antd';
import styled from 'styled-components';

import { getDateTimeStrings } from '@src/lib/DateParser';
import CardReloadButton from '@src/components/molecules/button/CardReload';
import Space from '@src/components/atoms/space';

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
    const {hours, minutes} = getDateTimeStrings(time);

    return (
    <Wrapper>
        <Typography.Text strong>{title}</Typography.Text>
        <ReloadWrapper>
            <StyledText>최근</StyledText>
            <Space direction="ROW"/>
            <Typography.Text>{hours}:{minutes}</Typography.Text>
            <Space direction="ROW" size={8}/>
            <CardReloadButton onClick={onClick} />
        </ReloadWrapper>
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

const ReloadWrapper = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    width:fit-content;
`;

const StyledText = styled(Typography.Text)`
    font-size:11px;
`;
