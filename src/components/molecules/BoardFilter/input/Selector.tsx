import React from 'react';
import {Select, Typography} from 'antd';
import styled from 'styled-components';

import {useBoardContext} from '@src/contexts/Board';

const {Option} = Select;

export type SelectorProps = {
  name: string;
  select: Array<{name: string; value: string}>;
};

export default function Selector({name, select}: SelectorProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  // tslint:disable-next-line: no-any
  const handleChange = (data: any) => {
    const newData = {};
    Object.keys(data).map(key => {
      newData[name + '_' + key] = data[key];
    });
    handleFilterChange(newData);
  };

  const handleChoicedSelectChange = value => {
    handleChange({type: value});
  };

  return (
    <StyledSelect
      value={filter[`${name}_type`]}
      onChange={handleChoicedSelectChange}>
      {select.map(item => (
        <Option key={item.name} value={item.value}>
          <Typography.Text>{item.name}</Typography.Text>
        </Option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled(Select)`
  width: 127px;
`;
