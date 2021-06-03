import React from 'react';
import dayjs, {Dayjs} from 'dayjs';

import DayjsDatePicker from '../../../molecules/BoardFilter/input/DayjsDatePicker';

import {CustomInputProps} from '../base';

export type DatePickerFormItemProps = CustomInputProps<Dayjs>;

function DatePickerFormItem({onChange, value}: DatePickerFormItemProps) {
  return (
    <DayjsDatePicker onChange={onChange} value={value ? dayjs(value) : null} />
  );
}

export default DatePickerFormItem;
