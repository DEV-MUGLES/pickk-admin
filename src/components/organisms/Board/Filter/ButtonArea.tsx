import React from 'react';
import {Button} from 'antd';
import styled from 'styled-components';

import Colors from '@src/components/atoms/colors';
import Space from '@src/components/atoms/space';

export type BoardFilterButtonAreaProps = {
    handleSubmit: () => void;
    handleReset: () => void
};

export default function ButtonArea(
    {
        handleSubmit,
        handleReset,
    }: BoardFilterButtonAreaProps,
) {
  return (
    <Wrapper>
        <SubmitButton icon="search" type="primary" onClick={handleSubmit}>조회</SubmitButton>
        <Space direction="ROW" />
        <ResetButton icon="undo" onClick={handleReset}>초기화</ResetButton>
    </Wrapper>
   );
}

const Wrapper = styled.div`
    width: fit-content;
    display: flex;
    flex-direction: row;
    align-items:center;
`;

const SubmitButton = styled(Button)`
    width: 100px;
`;

const ResetButton = styled(Button)`
    width: 100px;
    color: ${Colors.Primary};
    border-color: ${Colors.Primary}
`;
