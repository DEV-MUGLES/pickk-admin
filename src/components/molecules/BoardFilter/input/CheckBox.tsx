import React from 'react';
import {Checkbox} from 'antd';

import {useBoardContext} from '@src/contexts/Board';

export type CheckBoxProps = {
  name: string;
};

export default function CheckBox({name}: CheckBoxProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  const handleChange = e => {
    handleFilterChange({[name]: e.target.checked});
  };

  return <Checkbox checked={filter[name]} onChange={handleChange} />;
}
