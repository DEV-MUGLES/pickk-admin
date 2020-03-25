import React from 'react';
import {Input} from 'antd';
import styled from 'styled-components';
import {useBoardContext} from '@src/contexts/Board';

export type InputBoxProps = {
  name: string;
};

function InputBox({name}: InputBoxProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange, applyPreview} = action;

  // tslint:disable-next-line: no-any
  const handleChange = e => {
    handleFilterChange({[name]: e.target.value});
  };

  const handleEnterDown = e => {
    if (e.key === 'Enter') {
      applyPreview({...filter, [name]: e.target.value});
    }
  };

  return (
    <StyledInput
      value={filter[name]}
      onChange={handleChange}
      onKeyDown={handleEnterDown}
    />
  );
}

export default React.memo(InputBox);

const StyledInput = styled(Input)`
  width: 246px;
`;
