import React from 'react';
import moment, {Moment} from 'moment';
import {DatePicker} from 'antd';

import {ItemSubsDiscountRateInfo} from '@src/types';

export type DateTimePickerProps = {
  type: 'startAt' | 'endAt';
  dateTime: ItemSubsDiscountRateInfo;
  onChange: (type: 'startAt' | 'endAt', data: string) => void;
};

export default function DateTimePicker({
  type,
  dateTime,
  onChange,
}: DateTimePickerProps) {
  const defaultValue =
    type === 'startAt'
      ? dateTime.startAt
        ? moment(dateTime.startAt)
        : null
      : dateTime.endAt
      ? moment(dateTime.endAt)
      : null;

  const handleDate = (date: Moment) => {
    onChange(type, date.format());
  };

  const disabledDate = (current: Moment) =>
    current.isBefore(
      type === 'endAt' ? dateTime.startAt : moment().subtract(1, 'days'),
    );

  const disabledTime = (date: Moment) => {
    const startAt = moment(dateTime.startAt);

    if (type !== 'endAt' || !startAt.isSame(date, 'day')) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }

    return {
      disabledHours: () => [...Array(startAt.hours()).keys()],
      disabledMinutes: () =>
        startAt.isSame(date, 'hours')
          ? [...Array(startAt.minutes()).keys()]
          : [],
      disabledSeconds: () =>
        startAt.isSame(date, 'hours') && startAt.isSame(date, 'minutes')
          ? [...Array(startAt.seconds()).keys()]
          : [],
    };
  };

  return (
    <DatePicker
      showTime
      defaultValue={defaultValue}
      onChange={handleDate}
      disabledDate={disabledDate}
      disabledTime={disabledTime}
    />
  );
}
