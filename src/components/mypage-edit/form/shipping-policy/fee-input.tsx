import {useEffect, useState} from 'react';
import {Switch, Tag} from 'antd';
import styled from 'styled-components';
import {SellerShippingPolicy} from '@pickk/common';

import InputNumber from '@src/components/common/organisms/Form/Items/input-number';

import {CustomInputProps} from '@src/components/common/organisms/Form/base';

export type ShippingFeeInputValueType = Pick<
  SellerShippingPolicy,
  'fee' | 'minimumAmountForFree'
>;

export type ShippingFeeInputProps = CustomInputProps<ShippingFeeInputValueType>;

function ShippingFeeInput({value, onChange}: ShippingFeeInputProps) {
  const [isFree, setIsFree] = useState<boolean>(false);

  useEffect(() => {
    setIsFree(!value?.fee);
  }, [value]);

  const handleSwitchChange = (value: boolean) => {
    setIsFree(value);

    if (value) {
      onChange?.({
        fee: 0,
        minimumAmountForFree: 0,
      });
    }
  };

  const handleNumberChange = (e) => {
    const {value: _value, name} = e.target;
    onChange?.({
      ...value,
      [name]: parseInt(_value),
    });
  };

  return (
    <div>
      <Switch checked={isFree} onChange={handleSwitchChange} />
      <InputWrapper>
        {!isFree && (
          <>
            <Label>기본 배송비</Label>
            <InputNumber
              name="fee"
              value={value?.fee || 0}
              onChange={handleNumberChange}
            />
            <Label style={{marginTop: '0.4rem'}}>최소주문금액</Label>
            <InputNumber
              name="minimumAmountForFree"
              value={value?.minimumAmountForFree || 0}
              onChange={handleNumberChange}
            />
          </>
        )}
      </InputWrapper>
    </div>
  );
}

export default ShippingFeeInput;

const InputWrapper = styled.div`
  margin-top: 0.8rem;
`;

const Label = styled(Tag).attrs({
  color: 'orange',
})`
  margin-bottom: 0.4rem;
`;
