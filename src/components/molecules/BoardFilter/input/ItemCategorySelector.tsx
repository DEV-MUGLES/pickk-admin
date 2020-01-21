import React, {useState} from 'react';
import {Select, Typography} from 'antd';
import styled from 'styled-components';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';
import {itemCate, itemCateEnToKo} from '@src/models/ItemCategory';
import Space from '@src/components/atoms/space';

const {Option} = Select;

export type NestedSelectorProps = {
  name: string;
};

export default function NestedSelector({
  name,
}: NestedSelectorProps) {
  const [isMajorSelected, setMajorSelected] = useState(false);
  const [isMinorSelected, setMinorSelected] = useState(false);

  const majorOptions = itemCate.ROOT;

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

  const handleChoicedMajorChange = value => {
    const majorSelected = (value !== 'all');
    handleChange({major: value, minor: 'all', final: 'all'});
    setMajorSelected(majorSelected);
    setMinorSelected(false);
  };

  const handleChoicedMinorChange = value => {
    const minorSelected = (value !== 'all');
    handleChange({minor: value, final: 'all'});
    setMinorSelected(minorSelected);
  };

  const handleChoicedFinalChange = value => {
    handleChange({final: value});
  };

  return (
        <Wrapper>
            <StyledSelect
                    value={form[`${name}_major`]}
                    onChange={handleChoicedMajorChange}>
                    <Option key={'all'} value={'all'}>
                        <Typography.Text>전체</Typography.Text>
                    </Option>
                    {majorOptions.map(item => (
                    <Option key={item} value={item}>
                        <Typography.Text>{itemCateEnToKo[item]}</Typography.Text>
                    </Option>
                    ))}
            </StyledSelect>
            <Space direction="ROW" level={1}/>
            <StyledSelect
                    value={form[`${name}_minor`]}
                    onChange={handleChoicedMinorChange} disabled={!isMajorSelected}>
                    <Option key={'all'} value={'all'}>
                        <Typography.Text>전체</Typography.Text>
                    </Option>
                    {isMajorSelected &&
                        itemCate[form[`${name}_major`]].map(item => (
                            <Option key={item} value={item}>
                                <Typography.Text>{itemCateEnToKo[item]}</Typography.Text>
                            </Option>
                            ))
                    }
            </StyledSelect>
            <Space direction="ROW" level={1}/>
            <StyledSelect
                    value={form[`${name}_final`]}
                    onChange={handleChoicedFinalChange} disabled={!isMinorSelected}>
                    <Option key={'all'} value={'all'}>
                        <Typography.Text>전체</Typography.Text>
                    </Option>
                    {(isMinorSelected && itemCate[form[`${name}_minor`]]) &&
                        itemCate[form[`${name}_minor`]].map(item => (
                            <Option key={item} value={item}>
                                <Typography.Text>{itemCateEnToKo[item]}</Typography.Text>
                            </Option>
                            ))
                    }
            </StyledSelect>
        </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction:row;
    width:fit-content;
`;

const StyledSelect = styled(Select)`
    width: 127px;
`;
