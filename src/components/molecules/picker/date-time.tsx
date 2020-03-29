import React from 'react';
import moment from 'moment';
import {DatePicker} from 'antd';

import {ItemSubsDiscountRateInfo} from '@src/types';

export type DateTimePickerProps = {
  type: 'start' | 'end';
  dateTime: ItemSubsDiscountRateInfo;
  onChange: (type: 'start' | 'end', data: string) => void;
};

export default function DateTimePicker({
  type,
  dateTime,
  onChange,
}: DateTimePickerProps) {
  const defaultValue = type === 'start' ? dateTime.startAt : dateTime.endAt;

  const handleDate = (_, dateString) => {
    onChange(type, dateString);
  };

  return (
    <DatePicker
      showTime
      defaultValue={moment(defaultValue, 'YYYY-MM-DD HH:mm:ss')}
      onChange={handleDate}
    />
  );
}
