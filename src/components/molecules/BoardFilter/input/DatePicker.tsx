import React, { useState } from 'react';
import { Select, Typography, Button, Radio, DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import {useBoardFilterContext} from '@src/contexts/BoardFilter';
import Space from '@src/components/atoms/space';

const { Option } = Select;
const { RangePicker } = DatePicker;

export type DatePickerProps = {
    name: string;
    select?: [{ name: string, value: string}];
    quickButton?: boolean;
};

export default function Datepicker(
    {
        name,
        select,
        quickButton,
    }: DatePickerProps,
) {
    const BoardFilterContext = useBoardFilterContext();

    console.log(BoardFilterContext.state.form);

    // tslint:disable-next-line: no-any
    const handleChange = (key: string, value: any) => {
      BoardFilterContext.action.setProperty(name + '_' + key, value);
    };

    const handleChoicedSelectChange = (value) => {
        handleChange('type', value);
    };

    const [choicedQuickButton, setChoicedQuickButton] = useState('today');
    const quickButtonList = [{name: '오늘', value: 'today'},
        {name: '1주일', value: 'oneWeek'},
        {name: '1개월', value: 'oneMonth'},
        {name: '3개월', value: 'threeMonth'},
        {name: '6개월', value: 'sixMonth'}];

    const handleChoicedQuickButtonChange = (e) => {
        setChoicedQuickButton(e.target.value);
        if ( e.target.value === 'today') {
            handleChange('startDate', moment().format('YYYY-MM-DD'));
            handleChange('endDate', moment().format('YYYY-MM-DD'));
        } else if ( e.target.value === 'oneWeek') {
            handleChange('startDate', moment().subtract(1, 'weeks').format('YYYY-MM-DD'));
            handleChange('endDate', moment().format('YYYY-MM-DD'));
        } else if ( e.target.value === 'oneMonth') {
            handleChange('startDate', moment().subtract(1, 'months').format('YYYY-MM-DD'));
            handleChange('endDate', moment().format('YYYY-MM-DD'));
        } else if ( e.target.value === 'threeMonth') {
            handleChange('startDate', moment().subtract(3, 'months').format('YYYY-MM-DD'));
            handleChange('endDate', moment().format('YYYY-MM-DD'));
        } else if ( e.target.value === 'sixMonth') {
            handleChange('startDate', moment().subtract(6, 'months').format('YYYY-MM-DD'));
            handleChange('endDate', moment().format('YYYY-MM-DD'));
        }
    };

    const handleChoicedDateChange = (date) => {
        handleChange('startDate', moment(date[0]).format('YYYY-MM-DD'));
        handleChange('endDate', moment(date[1]).format('YYYY-MM-DD'));
    };

    return (
        <Wrapper>
        {select && (
            <RowWrapper>
                <Select value={BoardFilterContext.state.form[`${name}_type`]}
                 style={{ width: 120 }} onChange={handleChoicedSelectChange}>
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
            value={[moment(BoardFilterContext.state.form[`${name}_startDate`]),
            moment(BoardFilterContext.state.form[`${name}_endDate`])]}
            onChange={handleChoicedDateChange}
        />
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
