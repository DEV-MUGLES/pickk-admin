import React, { useState } from 'react';
import { Select, Typography, Button, Radio, DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import Space from '@src/components/atoms/space';

export type DatePickerProps = {
    select?: [{ name: string, value: string}];
    quickButton?: boolean;
    choicedSelectValue: string;
    setChoicedSelectValue: React.Dispatch<React.SetStateAction<string>>;
    choicedStartDate: moment.Moment;
    choicedEndDate: moment.Moment;
    setChoicedStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
    setChoicedEndDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
};

export default function Header(
    {
        select,
        quickButton,
        choicedSelectValue,
        setChoicedSelectValue,
        choicedStartDate,
        choicedEndDate,
        setChoicedStartDate,
        setChoicedEndDate,
    }: DatePickerProps,
) {
    const { Option } = Select;
    const { RangePicker } = DatePicker;
    const [choicedQuickButton, setChoicedQuickButton] = useState('today');
    const quickButtonList = [{name: '오늘', value: 'today'},
        {name: '1주일', value: 'oneWeek'},
        {name: '1개월', value: 'oneMonth'},
        {name: '3개월', value: 'threeMonth'},
        {name: '6개월', value: 'sixMonth'}];

    const handleChoicedSelectChange = (value) => {
        setChoicedSelectValue(value);
    };

    const handleChoicedQuickButtonChange = (e) => {
        setChoicedQuickButton(e.target.value);
        if ( e.target.value === 'today') {
            setChoicedStartDate(moment());
            setChoicedEndDate(moment());
        } else if ( e.target.value === 'oneWeek') {
            setChoicedStartDate(moment(moment().subtract(1, 'weeks').calendar()));
            setChoicedEndDate(moment());
        } else if ( e.target.value === 'oneMonth') {
            setChoicedStartDate(moment(moment().subtract(1, 'months').calendar()));
            setChoicedEndDate(moment());
        } else if ( e.target.value === 'threeMonth') {
            setChoicedStartDate(moment(moment().subtract(3, 'months').calendar()));
            setChoicedEndDate(moment());
        } else if ( e.target.value === 'sixMonth') {
            setChoicedStartDate(moment(moment().subtract(6, 'months').calendar()));
            setChoicedEndDate(moment());
        }
    };

    const handleChoicedDateChange = (date) => {
        setChoicedStartDate(moment(date[0]));
        setChoicedEndDate(moment(date[1]));
    };

    return (
        <Wrapper>
        {select && (
            <RowWrapper>
                <Select value={choicedSelectValue} style={{ width: 120 }} onChange={handleChoicedSelectChange}>
                    {select.map((item, index) => (
                        <Option value={item.value}>
                            <Typography.Text>{item.name}</Typography.Text>
                        </Option>
                        ))}
                </Select>
                <Space level={1}/>
            </RowWrapper>
        )}
        {quickButton && (
            <RowWrapper>
                <Radio.Group value={choicedQuickButton}
                    style={{width: 'fit-content'}}
                    onChange={handleChoicedQuickButtonChange}>
                        {quickButtonList.map((item, index) => (
                            <Radio.Button value={item.value}>
                                {item.name}
                            </Radio.Button>
                            ))}
                </Radio.Group>
                <Space level={1}/>
            </RowWrapper>
        )}
        <RangePicker name="choicedSelectValue"
            value={[moment(choicedStartDate), moment(choicedEndDate)]} onChange={handleChoicedDateChange}/>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
`;

const RowWrapper = styled.div`
    display:flex;
    flex-direction:column;
`;
