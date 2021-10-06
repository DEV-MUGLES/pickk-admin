import React from 'react';
import styled from 'styled-components';
import {palette} from '@pickk/design-token';

import FilterHeader, {BoardFilterHeaderProps} from './Header';
import FilterBody, {BoardFilterBodyProps} from './Body';
import FilterButtonArea from './ButtonArea';

export type BoardFilterProps = BoardFilterHeaderProps & BoardFilterBodyProps;

export default function BoardFilter(props: BoardFilterProps) {
  const headerProps: BoardFilterHeaderProps = props;
  const bodyProps: BoardFilterBodyProps = props;

  if (!props.inputs) {
    return <></>;
  }
  return (
    <FilterWrapper>
      <FilterHeader {...headerProps} />
      <FilterBody {...bodyProps} />
      <FilterButtonArea />
    </FilterWrapper>
  );
}

export const FilterWrapper = styled.div`
  background-color: ${palette.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
  margin-bottom: 1.4rem;
`;
