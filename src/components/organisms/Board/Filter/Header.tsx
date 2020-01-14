import React from 'react';
import {Typography, Tooltip, Button} from 'antd';
import styled from 'styled-components';

export type BoardFilterHeaderProps = {
    title: string;
    guideText?: string
};

export default function Header(
    {
        title,
        guideText,
    }: BoardFilterHeaderProps,
) {
  return (
    <Wrapper>
        <StyledTypographyText strong>
            {title}
        </StyledTypographyText>
        <GuideText>
            {guideText}
        </GuideText>
    </Wrapper>
   );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items:center;
    margin-right:auto;
`;

const StyledTypographyText = styled(Typography.Text)`
    padding-right:12px;
`;

const GuideText = styled.div`
    margin: 5px 12px 5px 0;
    color: rgba(0,0,0,.45);
    font-size:14px;
    line-height:22px;
`;
