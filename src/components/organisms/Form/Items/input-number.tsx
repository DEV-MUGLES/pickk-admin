import {Input, InputProps} from 'antd';

export type InputNumberProps = InputProps;

function InputNumber(props: InputNumberProps) {
  const {value, onChange} = props;

  const onNumberChange = (e) => {
    const newValue = parseInt(e.target.value || '0');

    if (Number.isNaN(newValue)) {
      return;
    }

    onChange?.({
      ...e,
      target: {...e.target, name: e.target.name, value: newValue},
    });
  };

  return <Input {...props} value={value || '0'} onChange={onNumberChange} />;
}

export default InputNumber;
