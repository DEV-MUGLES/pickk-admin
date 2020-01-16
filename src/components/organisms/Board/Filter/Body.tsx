import React from 'react';
import styled from 'styled-components';

import BoardFilterRow, {
  BoardFilterRowProps,
} from '@src/components/molecules/BoardFilter/BodyRow';

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
  width: 100%;
  padding: 0 35px;
  margin: 10px 0;
`;
