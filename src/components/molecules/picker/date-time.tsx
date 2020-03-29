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

  const handleDisableDate = currentDate => {
    if (type === 'end') {
      const startAt = new Date(dateTime.startAt);
      return (
        new Date(startAt.setDate(startAt.getDate())) > new Date(currentDate)
      );
    } else {
      const now = new Date(Date.now());
      return new Date(now.setDate(now.getDate() - 1)) > new Date(currentDate);
    }
  };

  const handleDisableTime = date => {
    const hours = [];
    const minutes = [];
    const seconds = [];

    if (type === 'end') {
      const startAt = new Date(dateTime.startAt);
      const startDate = new Date(dateTime.startAt).setHours(0, 0, 0, 0);
      const curDate = new Date(date).setHours(0, 0, 0, 0);

      if (startDate === curDate) {
        for (let i = startAt.getHours(); i >= 0; i--) {
          hours.push(i);
        }
        for (let i = startAt.getMinutes(); i >= 0; i--) {
          minutes.push(i);
        }
        for (let i = startAt.getSeconds(); i >= 0; i--) {
          seconds.push(i);
        }
      }
    }

    return {
      disabledHours: () => {
        return hours;
      },
      disabledMinutes: () => {
        return minutes;
      },
      disabledSeconds: () => {
        return seconds;
      },
    };
  };

  return (
    <DatePicker
      showTime
      defaultValue={moment(defaultValue, 'YYYY-MM-DD HH:mm:ss')}
      onChange={handleDate}
      disabledDate={handleDisableDate}
      disabledTime={handleDisableTime}
    />
  );
}
