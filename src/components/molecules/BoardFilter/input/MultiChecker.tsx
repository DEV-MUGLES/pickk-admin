import React, {useState} from 'react';
import {Checkbox} from 'antd';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';

const CheckboxGroup = Checkbox.Group;

export type MultiCheckerProps = {
  name: string;
  options: Array<{name: string, value: string}>;
};

export default function MultiChecker({
  name,
  options,
}: MultiCheckerProps) {
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(true);

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
  const allOptionNames = options.map(item => item.name);

  const handleCheckedNameChange = checkedList => {
    handleChange({choices: checkedList});
    setIndeterminate(!!checkedList.length && checkedList.length < allOptionNames.length);
    setCheckAll(checkedList.length === allOptionNames.length);
  };

  const handleCheckAllChange = e => {
    e.target.checked ? handleChange({choices: allOptionNames}) : handleChange({choices: []});
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <Wrapper>
      <StyledCheckbox
        indeterminate={indeterminate}
        onChange={handleCheckAllChange}
        checked={checkAll}
      >
        전체
      </StyledCheckbox>
    <CheckboxGroup
      options={allOptionNames}
      value={form[`${name}_choices`]}
      onChange={handleCheckedNameChange}
    />
  </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
`;

const StyledCheckbox = styled(Checkbox)`
  margin-right:8px;
`;
