import React from 'react';
import dayjs from 'dayjs';

import DayjsDatePicker from '../../../molecules/BoardFilter/input/DayjsDatePicker';

function DatePickerFormItem({
  defaultValue,
  onChange = (value: any) => null,
  value,
}) {
  return (
    <DayjsDatePicker
      defaultValue={dayjs(defaultValue)}
      onChange={onChange}
      value={dayjs(value)}
    />
  );
}

export default DatePickerFormItem;
