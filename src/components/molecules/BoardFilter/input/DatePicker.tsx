import React, {useState} from 'react';
import {Select, Typography, Radio, DatePicker} from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';
import Space from '@src/components/atoms/space';

const {Option} = Select;
const {RangePicker} = DatePicker;

export type DatePickerProps = {
  name: string;
  select?: Array<{name: string; value: string}>;
};

export default function Datepicker({
  name,
  select,
}: DatePickerProps) {
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

  const [choicedQuickButton, setChoicedQuickButton] = useState('oneMonth');
  const quickButtonList = [
    {name: '오늘', value: 'today'},
    {name: '1주일', value: 'oneWeek'},
    {name: '1개월', value: 'oneMonth'},
    {name: '3개월', value: 'threeMonth'},
    {name: '6개월', value: 'sixMonth'},
  ];

  const handleChoicedQuickButtonChange = e => {
    const { value } = e.target;
    setChoicedQuickButton(value);
    let startDate;
    const endDate = moment().format('YYYY-MM-DD');

    switch (value) {
      case 'today':
        startDate = moment().format('YYYY-MM-DD');
        break;
      case 'oneWeek':
        startDate = moment()
        .subtract(1, 'weeks')
        .format('YYYY-MM-DD');
        break;
      case 'oneMonth':
        startDate = moment()
        .subtract(1, 'months')
        .format('YYYY-MM-DD');
        break;
      case 'threeMonth':
        startDate = moment()
        .subtract(3, 'months')
        .format('YYYY-MM-DD');
        break;
      case 'sixMonth':
        startDate = moment()
        .subtract(6, 'months')
        .format('YYYY-MM-DD');
        break;
      }

    handleChange({startDate, endDate});
  };

  const handleChoicedDateChange = date => {
    const startDate = moment(date[0]).format('YYYY-MM-DD');
    const endDate = moment(date[1]).format('YYYY-MM-DD');
    handleChange({startDate, endDate});
  };

  return (
    <Wrapper>
      {select && (
        <>
          <StyledSelect
            value={form[`${name}_type`]}
            onChange={handleChoicedSelectChange}>
            {select.map(item => (
              <Option key={item.name} value={item.value}>
                <Typography.Text>{item.name}</Typography.Text>
              </Option>
            ))}
          </StyledSelect>
          <Space level={1} />
        </>
      )}
      <StyledRadioGroup
            value={choicedQuickButton}
            onChange={handleChoicedQuickButtonChange}>
            {quickButtonList.map(item => (
              <Radio.Button key={item.name} value={item.value}>
                {item.name}
              </Radio.Button>
            ))}
      </StyledRadioGroup>
      <Space level={1} />
      <RangePicker
        name="choicedSelectValue"
        value={[
          moment(form[`${name}_startDate`]),
          moment(form[`${name}_endDate`]),
        ]}
        onChange={handleChoicedDateChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledSelect = styled(Select)`
    width:127px;
`;

const StyledRadioGroup = styled(Radio.Group)`
    width:fit-content;
`;
