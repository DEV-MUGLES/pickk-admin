import React from 'react';
import dayjs, {Dayjs} from 'dayjs';

import {DayjsDatePicker} from '@components/new-common/molecules';

import {CustomInputProps} from '../base';
import {setEndOfDay, setStartOfDay} from '@src/common/helpers/date';

export type DatePickerFormItemProps = CustomInputProps<Dayjs> & {
  style?: React.CSSProperties;
  isStartOfDay?: boolean;
  isEndOfDay?: boolean;
};

function DatePickerFormItem({
  onChange,
  value,
  style,
  isStartOfDay,
  isEndOfDay,
}: DatePickerFormItemProps) {
  const handleChange = (_value) => {
    if (isStartOfDay) {
      onChange(setStartOfDay(_value));
      return;
    }

    if (isEndOfDay) {
      onChange(setEndOfDay(_value));
      return;
    }

    onChange(_value);
  };

  return (
    <DayjsDatePicker
      onChange={handleChange}
      value={value ? dayjs(value) : null}
      style={style}
    />
  );
}

export default DatePickerFormItem;
