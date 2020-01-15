import React from 'react';
import styled from 'styled-components';
import {Typography, Tooltip, Icon} from 'antd';
import Space from '@src/components/atoms/space';
import Colors from '@src/components/atoms/colors';

const {Text} = Typography;

export type BoardFilterRowProps = {
  labelText: string;
  guideText?: string;
  // tslint:disable-next-line: no-any
  Component: React.ComponentType<any>;
};

export default function BoardFilterRow({
  labelText,
  guideText,
  Component,
}: BoardFilterRowProps) {
  return (
    <Wrapper>
      <LabelWrapper>
        <StyledText>{labelText}</StyledText>
        {guideText && (
          <>
            <Space size={8} direction="ROW" />
            <Tooltip placement="right" title={guideText}>
              <Icon type="info-circle" style={{color: Colors.MiddleGrey}} />
            </Tooltip>
          </>
        )}
      </LabelWrapper>
      <InputWrapper>
        <Component />
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;

const LabelWrapper = styled.div`
  flex: 1;
  padding: 10px 20px;
  text-align: left;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputWrapper = styled.div`
  flex: 4;
  padding: 10px 20px;
  text-align: left;
`;

const StyledText = styled(Text)`
  margin-bottom: 2px;
`;
