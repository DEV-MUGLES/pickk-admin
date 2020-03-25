import React from 'react';
import {Checkbox} from 'antd';
import styled from 'styled-components';
import {useBoardContext} from '@src/contexts/Board';

export type CheckBoxProps = {
  name: string;
};

export default function CheckBox({name}: CheckBoxProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  // tslint:disable-next-line: no-any
  const handleChange = e => {
    handleFilterChange({[name]: e.target.checked});
  };

  return <Checkbox onChange={handleChange} />;
}
