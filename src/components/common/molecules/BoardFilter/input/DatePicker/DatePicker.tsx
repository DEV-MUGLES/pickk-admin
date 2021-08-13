import React, {useState} from 'react';
import {Select, Typography, Radio} from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import DayjsDatePicker from '../DayjsDatePicker';

import {useBoardContext} from '@src/common/contexts/Board';

import {
  DatePickerProps,
  quickBtnValue2Name,
  quickBtnValue2StartDate,
  QuickButtonValues,
} from './DatePicker.types';

const {Option} = Select;
const {RangePicker} = DayjsDatePicker;

export default function DatePicker({
  select,
  defaultQuickButtonValue = 'oneMonth',
}: DatePickerProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  const [choicedQuickButton, setChoicedQuickButton] = useState(
    defaultQuickButtonValue,
  );

  const handleChoicedSelectChange = (value) => {
    handleFilterChange({lookupDate: value});
  };

  const handleChoicedQuickButtonChange = (e) => {
    const {value} = e.target;
    setChoicedQuickButton(value);
    handleFilterChange({
      startDate: quickBtnValue2StartDate(value),
      endDate: dayjs().format('YYYY-MM-DD'),
    });
  };

  const defaultValue = {
    startDate: quickBtnValue2StartDate(defaultQuickButtonValue),
  };

  const handleChoicedDateChange = (date) => {
    const startDate = date?.[0] ?? defaultValue.startDate;
    const endDate = date?.[1];
    handleFilterChange({
      startDate: dayjs(startDate).format('YYYY-MM-DD'),
      endDate: dayjs(endDate).format('YYYY-MM-DD'),
    });
  };

  return (
    <Wrapper>
      {select && (
        <StyledSelect
          value={filter['lookupDate']}
          onChange={handleChoicedSelectChange}>
          {select.map((item) => (
            <Option key={item.name} value={item.value}>
              <Typography.Text>{item.name}</Typography.Text>
            </Option>
          ))}
        </StyledSelect>
      )}
      <StyledRadioGroup
        value={choicedQuickButton}
        onChange={handleChoicedQuickButtonChange}>
        {QuickButtonValues.map((value) => (
          <Radio.Button key={value} value={value}>
            {quickBtnValue2Name(value)}
          </Radio.Button>
        ))}
      </StyledRadioGroup>
      <RangePicker
        name="choicedSelectValue"
        value={[
          dayjs(filter[`startDate`] ?? defaultValue.startDate),
          dayjs(filter[`endDate`]),
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
  width: 127px;
  margin-bottom: 0.8rem;
`;

const StyledRadioGroup = styled(Radio.Group)`
  width: fit-content;
  margin-bottom: 0.8rem;
`;
