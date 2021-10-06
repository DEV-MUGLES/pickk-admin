import styled from 'styled-components';
import {Col, Input, Select, Space, Tag} from 'antd';
import {palette} from '@pickk/design-token';
import {BankCode} from '@pickk/common';

import {BankNameKorAlias} from '@src/common/helpers/alias';
import {CustomInputProps} from '../base';

const {Option} = Select;

export type AccountInputType = {
  bankCode: BankCode;
  number: string;
  ownerName: string;
};

export type AcccountInputProps = CustomInputProps<AccountInputType>;

function AccountInput({value, onChange}: AcccountInputProps) {
  const triggerChange = (changedValue) => {
    onChange?.({
      ...value,
      ...changedValue,
    });
  };

  const handleSelectChange = (value) => {
    triggerChange({bankCode: value});
  };

  const handleInputChange = ({target: {name, value}}) => {
    triggerChange({[name]: value});
  };

  return (
    <Space direction="vertical" size="middle" style={{marginTop: '0.4rem'}}>
      <Col>
        <Label>계좌번호</Label>
        <Select
          value={value?.bankCode}
          placeholder="은행"
          onChange={handleSelectChange}>
          {Object.keys(BankCode).map((key) => (
            <Option key={key} value={key}>
              {BankNameKorAlias[key]}
            </Option>
          ))}
        </Select>
        <Input
          value={value?.number ?? ''}
          name="number"
          placeholder="계좌번호"
          onChange={handleInputChange}
          style={{marginTop: '0.4rem'}}
        />
      </Col>
      <Col>
        <Label>예금주</Label>
        <Input
          value={value?.ownerName ?? ''}
          name="ownerName"
          placeholder="예금주"
          onChange={handleInputChange}
        />
      </Col>
    </Space>
  );
}

export default AccountInput;

const Label = styled(Tag).attrs({
  color: palette.gray2,
})`
  color: ${palette.black};
  margin-bottom: 0.4rem;
`;

export const CheckAccountValidation = async (
  _,
  {bankCode, number, ownerName}: AccountInputType,
) => {
  if (!bankCode?.length) {
    throw new Error('은행을 선택해주세요.');
  }

  if (!number?.length) {
    throw new Error('계좌번호를 입력해주세요.');
  }

  if (!ownerName?.length) {
    throw new Error('예금주를 입력해주세요.');
  }

  return;
};
