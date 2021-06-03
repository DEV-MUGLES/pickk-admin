import {ChangeEvent} from 'react';
import {Input, InputProps} from 'antd';

export type InputNumberProps = InputProps;

function InputNumber(props: InputNumberProps) {
  const {value, onChange} = props;

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value || '0');

    if (Number.isNaN(newValue) || !onChange) {
      return;
    }

    onChange({
      ...e,
      target: {
        ...e.target,
        name: e.target.name,
        value: newValue.toString(),
      },
    });
  };

  return <Input {...props} value={value || '0'} onChange={onNumberChange} />;
}

export default InputNumber;
