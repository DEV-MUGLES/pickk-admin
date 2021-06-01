import {useEffect, useState} from 'react';
import {Select, Typography} from 'antd';

import AccountInput, {
  AccountInputType,
} from '@src/components/organisms/Form/Items/account-input';
import {ClaimFeePayMethod} from '@src/operations/__generated__/globalTypes';

const {Option} = Select;
const {Text} = Typography;

function FeePayReceiveInput({value, onChange}) {
  const [feePayMethod, setFeePayMethod] = useState<ClaimFeePayMethod>();
  const [accountInput, setAccountInput] = useState<AccountInputType>();

  useEffect(() => {
    setFeePayMethod(value?.feePayMethod);
    setAccountInput(value?.accountInput);
  }, [value]);

  const triggerChange = (changedValue) => {
    onChange?.({
      feePayMethod,
      accountInput,
      ...value,
      ...changedValue,
    });
  };

  const handleFeePayMethodChange = (selectedValue: ClaimFeePayMethod) => {
    setFeePayMethod(selectedValue);
    triggerChange({feePayMethod: selectedValue});
  };

  const handleAccountInputChange = (input: any) => {
    setAccountInput(input);
    triggerChange({accountInput: input});
  };

  return (
    <>
      <Select
        value={feePayMethod}
        onChange={handleFeePayMethodChange}
        style={{marginBottom: '0.8rem'}}>
        <Option value={ClaimFeePayMethod.Enclose}>택배상자 동봉</Option>
        <Option value={ClaimFeePayMethod.Trans}>계좌입금</Option>
      </Select>
      {feePayMethod === ClaimFeePayMethod.Trans && (
        <>
          <Text>[ 교환배송비 수령 계좌번호 ]</Text>
          <AccountInput
            value={accountInput}
            onChange={handleAccountInputChange}
          />
        </>
      )}
    </>
  );
}

export default FeePayReceiveInput;
