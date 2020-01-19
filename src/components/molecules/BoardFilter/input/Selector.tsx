import React from 'react';
import {Select, Typography} from 'antd';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';

const {Option} = Select;

export type SelectorProps = {
  name: string;
  select: Array<{name: string; value: string}>;
};

export default function Selector({
  name,
  select,
}: SelectorProps) {
  const BoardFilterContext = useBoardFilterContext();
  const {form} = BoardFilterContext.state;
  const {setForm} = BoardFilterContext.action;

  // tslint:disable-next-line: no-any
  const handleChange = (data: any) => {
    const newData = {};
    Object.keys(data).map(key => {
      newData[name + '_' + key] = data[key];
    });
    setForm({
      ...form,
      ...newData,
    });
  };

  const handleChoicedSelectChange = value => {
    handleChange({type: value});
  };

  return (
    <StyledSelect
            value={form[`${name}_type`]}
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
