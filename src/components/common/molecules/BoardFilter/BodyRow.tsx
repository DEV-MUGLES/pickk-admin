import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';

import InfoTooltip from '@src/components/common/atoms/info-tooltip';
import {GREY} from '@src/common/constants/colors';

const {Text} = Typography;

export type BoardFilterRowProps = {
  labelText: string;
  guideText?: string;
  // tslint:disable-next-line: no-any
  Component: React.ComponentType<any>;
  [propertyName: string]: unknown;
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
          <InfoTooltip
            placement="right"
            title={guideText}
            iconStyle={{marginLeft: '0.6rem'}}
          />
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
  border-bottom: 1px solid ${GREY[200]};
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
