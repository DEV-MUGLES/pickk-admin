import React from 'react';
import {Select, Typography, Input} from 'antd';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';
import Space from '@src/components/atoms/space';

const {Option} = Select;

export type SelectInputProps = {
  name: string;
  select?: [{name: string; value: string}];
};

export default function SelectInput({
  name,
  select,
}: SelectInputProps) {
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

  const handleInputQueryChange = e => {
    handleChange({query: e.target.value});
  };

  return (
    <Wrapper>
          <StyledSelect
            value={form[`${name}_type`]}
            onChange={handleChoicedSelectChange}>
            {select.map(item => (
              <Option key={item.name} value={item.value}>
                <Typography.Text>{item.name}</Typography.Text>
              </Option>
            ))}
          </StyledSelect>
          <Space direction={'ROW'} level={1} />
          <Input
            onChange={handleInputQueryChange}
          />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

const StyledSelect = styled(Select)`
    width: 200px;
`;
