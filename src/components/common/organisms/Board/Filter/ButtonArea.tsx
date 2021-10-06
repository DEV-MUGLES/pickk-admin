import React from 'react';
import styled from 'styled-components';
import {Button} from 'antd';
import {SearchOutlined, UndoOutlined} from '@ant-design/icons';
import {palette} from '@pickk/design-token';

import {useBoardContext} from '@src/common/contexts/Board';

import Space from '@src/components/common/atoms/space';

export default function FilterButtonArea() {
  const {action} = useBoardContext();
  const {submitFilter, initFilter} = action;

  return (
    <Wrapper>
      <SubmitButton
        icon={<SearchOutlined />}
        type="primary"
        onClick={submitFilter}>
        조회
      </SubmitButton>
      <Space direction="ROW" />
      <ResetButton icon={<UndoOutlined />} onClick={initFilter}>
        초기화
      </ResetButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const SubmitButton = styled(Button)`
  width: 6rem;
`;

const ResetButton = styled(Button)`
  width: 6rem;
  color: ${palette.gray5};
  border-color: ${palette.gray5};
`;
