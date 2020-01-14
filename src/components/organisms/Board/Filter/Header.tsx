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
        <Tooltip placement="bottomRight" title={guideText}>
            <Button icon="info-circle" />
        </Tooltip>
    </Wrapper>
   );
}

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items:center;
`;

const StyledTypographyText = styled(Typography.Text)`
    margin-right:auto;
`;
