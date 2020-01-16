import React from 'react';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';

import FilterHeader, {BoardFilterHeaderProps} from './Header';
import FilterBody, {BoardFilterBodyProps} from './Body';
import FilterButtonArea, {BoardFilterButtonAreaProps} from './ButtonArea';
import Colors from '@src/components/atoms/colors';

export type BoardFilterProps = BoardFilterHeaderProps &
  BoardFilterBodyProps & {
    onSubmit;
  };

export default function BoardFilter(props: BoardFilterProps) {
  const headerProps: BoardFilterHeaderProps = props;
  const bodyProps: BoardFilterBodyProps = props;

  const BoardFilterContext = useBoardFilterContext();

  const handleSubmit = () => {
    props.onSubmit(BoardFilterContext.state.form);
  };

  const buttonAreaProps: BoardFilterButtonAreaProps = {
    handleSubmit,
  };

  if (!props.inputs) {
    return <></>;
  }
  return (
    <Wrapper>
      <FilterHeader {...headerProps} />
      <FilterBody {...bodyProps} />
      <FilterButtonArea {...buttonAreaProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${Colors.White};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 24px;
`;
