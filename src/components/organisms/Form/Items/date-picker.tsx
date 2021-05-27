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
      defaultValue={value ? dayjs(defaultValue) : null}
      onChange={onChange}
      value={value ? dayjs(value) : null}
    />
  );
}

export default DatePickerFormItem;
