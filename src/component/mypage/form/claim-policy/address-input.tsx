import {Input, Space} from 'antd';

import {CustomInputProps} from '@src/components/organisms/Form/base';
import {MeSeller_meSeller_returnAddress} from '@src/operations/__generated__/MeSeller';

export type AddressType = Pick<
  MeSeller_meSeller_returnAddress,
  'baseAddress' | 'detailAddress' | 'postalCode'
>;

export type AddressInputProps = CustomInputProps<AddressType>;

function AddressInput({value, onChange}: AddressInputProps) {
  const handleChange = (e) => {
    const {name, value: _value} = e.target;

    onChange?.({
      ...value,
      [name]: _value,
    });
  };

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Input
        name="baseAddress"
        value={value?.baseAddress || ''}
        placeholder="주소"
        onChange={handleChange}
      />
      <Input
        name="detailAddress"
        value={value?.detailAddress || ''}
        placeholder="상세주소"
        onChange={handleChange}
      />
      <Input
        name="postalCode"
        value={value?.postalCode || ''}
        placeholder="우편번호"
        onChange={handleChange}
      />
    </Space>
  );
}

export default AddressInput;