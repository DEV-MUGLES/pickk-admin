import {Select, Typography} from 'antd';
import {ClaimFeePayMethod} from '@pickk/common';

import AccountInput, {
  AccountInputType,
} from '@src/components/organisms/Form/Items/account-input';
import {CustomInputProps} from '@src/components/organisms/Form/base';

const {Option} = Select;
const {Text} = Typography;

export type FeePayReceiveValueType = {
  feePayMethod: ClaimFeePayMethod;
  accountInput: AccountInputType;
};

export type FeePayReceiveInputProps = CustomInputProps<FeePayReceiveValueType>;

function FeePayReceiveInput({value, onChange}: FeePayReceiveInputProps) {
  const isAccountInputVisible = value?.feePayMethod === ClaimFeePayMethod.Trans;

  const handleFeePayMethodChange = (feePayMethod: ClaimFeePayMethod) => {
    onChange?.({
      ...value,
      feePayMethod,
    });
  };

  const handleAccountInputChange = (accountInput: AccountInputType) => {
    onChange?.({
      ...value,
      accountInput,
    });
  };

  return (
    <>
      <Select value={value?.feePayMethod} onChange={handleFeePayMethodChange}>
        <Option value={ClaimFeePayMethod.Enclose}>택배상자 동봉</Option>
        <Option value={ClaimFeePayMethod.Trans}>계좌입금</Option>
      </Select>
      {isAccountInputVisible && (
        <div style={{marginTop: '0.8rem'}}>
          <Text>[ 교환배송비 수령 계좌번호 ]</Text>
          <AccountInput
            value={value?.accountInput}
            onChange={handleAccountInputChange}
          />
        </div>
      )}
    </>
  );
}

export default FeePayReceiveInput;
