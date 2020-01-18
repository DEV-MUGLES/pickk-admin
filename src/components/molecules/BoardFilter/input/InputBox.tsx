import React from 'react';
import {Input} from 'antd';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';

export type InputBoxProps = {
  name: string;
};

export default function InputBox({
  name,
}: InputBoxProps) {
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

  const handleInputQueryChange = e => {
    handleChange({query: e.target.value});
  };

  return (
          <StyledInput
            onChange={handleInputQueryChange}
          />
  );
}

const StyledInput = styled(Input)`
    width:246px;
`;
