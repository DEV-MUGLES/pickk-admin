import React from 'react';
import styled from 'styled-components';

import BoardFilterRow, {
  BoardFilterRowProps,
} from '@src/components/molecules/BoardFilterRow';
import Colors from '@src/components/atoms/colors';

export type BoardFilterBodyProps = {
  inputs: BoardFilterRowProps[];
};

export default function FilterBody({inputs}: BoardFilterBodyProps) {
  return (
    <InputsWrapper>
      {inputs &&
        inputs.map(item => <BoardFilterRow key={item.labelText} {...item} />)}
    </InputsWrapper>
  );
}

const InputsWrapper = styled.div`
  background-color: ${Colors.CreamWhite};
  width: 100%;
  padding: 0 35px;
  margin: 10px 0;
  border-box: box-sizing;
`;
