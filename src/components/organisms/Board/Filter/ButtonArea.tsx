import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

import {useBoardContext} from '@src/contexts/Board';

import Colors from '@src/components/atoms/colors';
import Space from '@src/components/atoms/space';

export default function FilterButtonArea() {
  const {action} = useBoardContext();
  const {submitFilter, initFilter} = action;

  return (
    <Wrapper>
      <SubmitButton icon="search" type="primary" onClick={submitFilter}>
        조회
      </SubmitButton>
      <Space direction="ROW" />
      <ResetButton icon="undo" onClick={initFilter}>
        초기화
      </ResetButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: fit-content;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  width: 100px;
`;

const ResetButton = styled(SubmitButton)`
  color: ${Colors.Primary};
  border-color: ${Colors.Primary};
`;
