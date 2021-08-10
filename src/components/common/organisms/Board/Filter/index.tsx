import React from 'react';
import styled from 'styled-components';

import FilterHeader, {BoardFilterHeaderProps} from './Header';
import FilterBody, {BoardFilterBodyProps} from './Body';
import FilterButtonArea from './ButtonArea';
import {WHITE} from '@src/components/common/atoms/colors';

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
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
`;
