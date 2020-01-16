import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';

import Colors from '@src/components/atoms/colors';
import Space from '@src/components/atoms/space';

export type BoardFilterButtonAreaProps = {
  handleSubmit: () => void;
};

export default function FilterButtonArea({
  handleSubmit,
}: BoardFilterButtonAreaProps) {
  const BoardFilterContext = useBoardFilterContext();

  return (
    <Wrapper>
      <SubmitButton icon="search" type="primary" onClick={handleSubmit}>
        조회
      </SubmitButton>
      <Space direction="ROW" />
      <ResetButton icon="undo" onClick={BoardFilterContext.action.initForm}>
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
