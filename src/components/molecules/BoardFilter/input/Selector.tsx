import React from 'react';
import {Select, Typography} from 'antd';
import styled from 'styled-components';

import {useBoardContext} from '@src/contexts/Board';

const {Text} = Typography;
const {Option} = Select;

export type SelectorProps = {
  name: string;
  select: Array<{name: string; value: string}>;
};

export default function Selector({name, select}: SelectorProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  const handleChange = value => {
    handleFilterChange({[name]: value});
  };

  return (
    <StyledSelect value={filter[name]} onChange={handleChange}>
      {select.map(item => (
        <Option key={item.name} value={item.value}>
          <Text>{item.name}</Text>
        </Option>
      ))}
    </StyledSelect>
  );
}

const StyledSelect = styled(Select)`
  width: 127px;
`;
