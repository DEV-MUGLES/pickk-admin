import React from 'react';
import {Typography, Tooltip, Icon} from 'antd';
import styled from 'styled-components';

import Space from '@src/components/atoms/space';
import Colors from '@src/components/atoms/colors';

const {Text} = Typography;

export type BoardFilterRowProps = {
  labelText: string;
  guideText?: string;
  // tslint:disable-next-line: no-any
  Component: React.ComponentType<any>;
  // tslint:disable-next-line: no-any
  [propertyName: string]: any;
};

export default function BoardFilterRow({
  labelText,
  guideText,
  Component,
  ...componentProps
}: BoardFilterRowProps) {
  return (
    <Wrapper>
      <LabelWrapper>
        <StyledText>{labelText}</StyledText>
        {guideText && (
          <>
            <Space size={8} direction="ROW" />
            <Tooltip placement="right" title={guideText}>
              <StyledIcon type="info-circle" />
            </Tooltip>
          </>
        )}
      </LabelWrapper>
      <InputWrapper>
        <Component {...componentProps} />
      </InputWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid ${Colors.LightGrey};
`;

const LabelWrapper = styled.div`
  flex: 1;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: fit-content;
  margin-top: 4px;
`;

const InputWrapper = styled.div`
  flex: 5;
  padding: 10px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

const StyledText = styled(Text)`
  margin-bottom: 2px;
`;

const StyledIcon = styled(Icon)`
  color: ${Colors.MiddleGrey};
`;
