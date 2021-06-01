import styled from 'styled-components';
import {Col, Input, Select, Space, Typography} from 'antd';
import {useEffect, useState} from 'react';

import {InicisBankCode} from '@src/operations/__generated__/globalTypes';

const {Option} = Select;
const {Text} = Typography;

export type AccountInputType = {
  bankCode: InicisBankCode;
  number: string;
  ownerName: string;
};

export type AcccountInputProps = {
  value: AccountInputType;
  onChange: (value: any) => void;
};

function AccountInput({value, onChange}: AcccountInputProps) {
  const [inputs, setInputs] = useState<AccountInputType>(value);

  useEffect(() => {
    setInputs({
      bankCode: value?.bankCode,
      number: value?.number ?? '',
      ownerName: value?.ownerName ?? '',
    });
  }, [value]);

  const triggerChange = (changedValue) => {
    onChange?.({
      ...inputs,
      ...value,
      ...changedValue,
    });
  };

  const handleSelectChange = (value) => {
    setInputs({...inputs, bankCode: value});
    triggerChange({bankCode: value});
  };

  const handleInputChange = ({target: {name, value}}) => {
    setInputs({...inputs, [name]: value});
    triggerChange({[name]: value});
  };

  return (
    <Space direction="vertical" size="middle" style={{marginTop: '0.4rem'}}>
      <Col>
        <Label>계좌번호</Label>
        <Select
          value={inputs?.bankCode}
          placeholder="은행"
          onChange={handleSelectChange}>
          {Object.keys(InicisBankCode).map((key) => (
            <Option key={key} value={key}>
              {key}
            </Option>
          ))}
        </Select>
        <Input
          value={inputs?.number}
          name="number"
          placeholder="계좌번호"
          onChange={handleInputChange}
          style={{marginTop: '0.4rem'}}
        />
      </Col>
      <Col>
        <Label>예금주</Label>
        <Input
          value={inputs?.ownerName}
          name="ownerName"
          placeholder="예금주"
          onChange={handleInputChange}
        />
      </Col>
    </Space>
  );
}

export default AccountInput;

const Label = styled(Text)`
  width: 6rem;
`;
