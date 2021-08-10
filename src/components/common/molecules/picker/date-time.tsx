import React from 'react';
import dayjs, {Dayjs} from 'dayjs';

import DayjsDatePicker from '../BoardFilter/input/DayjsDatePicker';
import {ItemDiscount} from '@src/types';

export type DateTimePickerProps = {
  type: 'startAt' | 'endAt';
  dateTime: ItemDiscount;
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
        ? dayjs(dateTime.startAt)
        : null
      : dateTime.endAt
      ? dayjs(dateTime.endAt)
      : null;

  const handleDate = (date: Dayjs) => {
    onChange(type, date.format());
  };

  const disabledDate = (current: Dayjs) =>
    current.isBefore(
      type === 'endAt' ? dateTime.startAt : dayjs().subtract(1, 'day'),
    );

  const disabledTime = (date: Dayjs) => {
    const startAt = dayjs(dateTime.startAt);

    if (type !== 'endAt' || !startAt.isSame(date, 'day')) {
      return {
        disabledHours: () => [],
        disabledMinutes: () => [],
        disabledSeconds: () => [],
      };
    }

    return {
      disabledHours: () => [...Array(startAt.hour()).keys()],
      disabledMinutes: () =>
        startAt.isSame(date, 'hours')
          ? [...Array(startAt.minute()).keys()]
          : [],
      disabledSeconds: () =>
        startAt.isSame(date, 'hours') && startAt.isSame(date, 'minutes')
          ? [...Array(startAt.second()).keys()]
          : [],
    };
  };

  return (
    <DayjsDatePicker
      showTime
      defaultValue={defaultValue}
      onChange={handleDate}
      disabledDate={disabledDate}
      disabledTime={disabledTime}
    />
  );
}
