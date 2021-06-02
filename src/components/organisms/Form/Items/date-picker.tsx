import React from 'react';
import dayjs, {Dayjs} from 'dayjs';

import DayjsDatePicker from '../../../molecules/BoardFilter/input/DayjsDatePicker';

export type DatePickerFormItemProps = {
  defaultValue: Dayjs;
  onChange: (value: Dayjs) => void;
  value: Dayjs;
};

function DatePickerFormItem({
  defaultValue,
  onChange = (value: Dayjs) => null,
  value,
}: DatePickerFormItemProps) {
  return (
    <DayjsDatePicker
      defaultValue={value ? dayjs(defaultValue) : null}
      onChange={onChange}
      value={value ? dayjs(value) : null}
    />
  );
}

export default DatePickerFormItem;
