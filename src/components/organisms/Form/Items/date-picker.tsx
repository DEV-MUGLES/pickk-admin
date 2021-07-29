import React from 'react';
import dayjs, {Dayjs} from 'dayjs';

import DayjsDatePicker from '../../../molecules/BoardFilter/input/DayjsDatePicker';

import {CustomInputProps} from '../base';

export type DatePickerFormItemProps = CustomInputProps<Dayjs> & {
  style?: React.CSSProperties;
};

function DatePickerFormItem({onChange, value, style}: DatePickerFormItemProps) {
  return (
    <DayjsDatePicker
      onChange={onChange}
      value={value ? dayjs(value) : null}
      style={style}
    />
  );
}

export default DatePickerFormItem;
