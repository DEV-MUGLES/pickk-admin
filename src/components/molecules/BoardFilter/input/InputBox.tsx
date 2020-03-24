import React from 'react';
import {Input} from 'antd';
import styled from 'styled-components';
import {useBoardContext} from '@src/contexts/Board';

export type InputBoxProps = {
  name: string;
};

export default function InputBox({name}: InputBoxProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  // tslint:disable-next-line: no-any
  const handleChange = e => {
    handleFilterChange({[name]: e.target.value});
  };

  return <StyledInput value={filter[name]} onChange={handleChange} />;
}

const StyledInput = styled(Input)`
  width: 246px;
`;
