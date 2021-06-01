import {Input, InputProps} from 'antd';
import {ChangeEvent, useEffect, useState} from 'react';

export type InputNumberProps = InputProps;

function InputNumber(props: InputNumberProps) {
  const {onChange} = props;

  const triggerChange = (changedValue: ChangeEvent<HTMLInputElement>) => {
    onChange?.(changedValue);
  };

  const onNumberChange = (e) => {
    const newValue = parseInt(e.target.value || '0', 10);

    if (Number.isNaN(newValue)) {
      return;
    }

    triggerChange({...e, target: {...e.target, value: newValue}});
  };

  return <Input {...props} onChange={onNumberChange} />;
}

export default InputNumber;
