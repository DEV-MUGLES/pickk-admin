import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';

export type BoardFilterHeaderProps = {
  title: string;
  guideText?: string;
};

export default function FilterHeader({
  title,
  guideText,
}: BoardFilterHeaderProps) {
  return (
    <Wrapper>
      <TitleText strong>{title}</TitleText>
      <GuideText>{guideText}</GuideText>
    </Wrapper>
  );
}

const Wrapper = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const TitleText = styled(Typography.Text)`
  padding-right: 0.8rem;
`;

const GuideText = styled(Typography.Text)`
  margin: 0.25rem 0.8rem 0.25rem 0;
  color: rgba(0, 0, 0, 0.45);
  font-size: 14px;
`;
