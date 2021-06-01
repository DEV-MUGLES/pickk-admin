import {Input, Space} from 'antd';
import {useEffect, useState} from 'react';

export type AddressType = {
  baseAddress: string;
  detailAddress: string;
  postalCode: string;
};

export type AddressInputProps = {
  value: AddressType;
  onChange: (value: any) => void;
};

function AddressInput({value, onChange}: AddressInputProps) {
  const [address, setAddress] = useState<AddressType>({
    baseAddress: '',
    detailAddress: '',
    postalCode: '',
  });

  useEffect(() => {
    setAddress({
      baseAddress: value?.baseAddress ?? '',
      detailAddress: value?.detailAddress ?? '',
      postalCode: value?.postalCode ?? '',
    });
  }, [value]);

  const triggerChange = (changedValue) => {
    onChange?.({
      ...address,
      ...value,
      ...changedValue,
    });
  };

  const handleChange = ({target: {value, name}}) => {
    setAddress({
      ...address,
      [name]: value,
    });

    triggerChange({
      [name]: value,
    });
  };

  return (
    <Space direction="vertical" style={{width: '100%'}}>
      <Input
        name="baseAddress"
        value={address?.baseAddress}
        placeholder="주소"
        onChange={handleChange}
      />
      <Input
        name="detailAddress"
        value={address?.detailAddress}
        placeholder="상세주소"
        onChange={handleChange}
      />
      <Input
        name="postalCode"
        value={address?.postalCode}
        placeholder="우편번호"
        onChange={handleChange}
      />
    </Space>
  );
}

export default AddressInput;
