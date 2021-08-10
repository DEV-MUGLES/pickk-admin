import React, {useState} from 'react';
import {Select, Typography, Radio} from 'antd';
import styled from 'styled-components';
import dayjs from 'dayjs';

import DayjsDatePicker from './DayjsDatePicker';
import Space from '@src/components/common/atoms/space';
import {useBoardContext} from '@src/common/contexts/Board';

const {Option} = Select;
const {RangePicker} = DayjsDatePicker;

export type DatePickerProps = {
  name: string;
  select?: Array<{name: string; value: string}>;
};

export default function Datepicker({name, select}: DatePickerProps) {
  const {state, action} = useBoardContext();
  const {filter} = state;
  const {handleFilterChange} = action;

  const handleChoicedSelectChange = (value) => {
    handleFilterChange({lookupDate: value});
  };

  const [choicedQuickButton, setChoicedQuickButton] = useState(
    '' /*'oneMonth'*/,
  );
  const quickButtonList = [
    {name: '오늘', value: 'today'},
    {name: '1주일', value: 'oneWeek'},
    {name: '1개월', value: 'oneMonth'},
    {name: '3개월', value: 'threeMonth'},
    {name: '6개월', value: 'sixMonth'},
  ];

  const handleChoicedQuickButtonChange = (e) => {
    const {value} = e.target;
    setChoicedQuickButton(value);
    let startDate;
    const endDate = dayjs().format('YYYY-MM-DD');

    switch (value) {
      case 'today':
        startDate = dayjs().format('YYYY-MM-DD');
        break;
      case 'oneWeek':
        startDate = dayjs().subtract(1, 'week').format('YYYY-MM-DD');
        break;
      case 'oneMonth':
        startDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
        break;
      case 'threeMonth':
        startDate = dayjs().subtract(3, 'month').format('YYYY-MM-DD');
        break;
      case 'sixMonth':
        startDate = dayjs().subtract(6, 'month').format('YYYY-MM-DD');
        break;
    }

    handleFilterChange({startDate, endDate});
  };

  const handleChoicedDateChange = (date) => {
    const startDate = dayjs(date[0]).format('YYYY-MM-DD');
    const endDate = dayjs(date[1]).format('YYYY-MM-DD');
    handleFilterChange({startDate, endDate});
  };

  return (
    <Wrapper>
      {select && (
        <>
          <StyledSelect
            value={filter['lookupDate']}
            onChange={handleChoicedSelectChange}>
            {select.map((item) => (
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
        {quickButtonList.map((item) => (
          <Radio.Button key={item.name} value={item.value}>
            {item.name}
          </Radio.Button>
        ))}
      </StyledRadioGroup>
      <Space level={1} />
      <RangePicker
        name="choicedSelectValue"
        value={[dayjs(filter[`startDate`]), dayjs(filter[`endDate`])]}
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
`;

const StyledRadioGroup = styled(Radio.Group)`
  width: fit-content;
`;
