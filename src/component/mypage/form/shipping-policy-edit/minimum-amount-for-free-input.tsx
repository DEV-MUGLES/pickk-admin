import {useEffect, useState} from 'react';
import {Input, Switch, Typography} from 'antd';
import styled from 'styled-components';
import InputNumber from '@src/components/organisms/Form/Items/input-number';

const {Text} = Typography;

function MinimumAmountForFreeInput({value, onChange}) {
  const [number, setNumber] = useState<number>(0);
  const [isFree, setIsFree] = useState<boolean>();

  useEffect(() => {
    setIsFree(!value);

    if (value) {
      setNumber(value || 0);
    }
  }, [value]);

  useEffect(() => {
    onChange?.(number);
  }, [number]);

  const handleSwitchChange = (value: boolean) => {
    setIsFree(value);

    if (value) {
      setNumber(0);
    }
  };

  const handleNumberChange = ({target: {value}}) => {
    setNumber(value);
  };

  return (
    <>
      <Switch checked={isFree} onChange={handleSwitchChange} />
      <InputWrapper style={{marginTop: '0.8rem'}}>
        {!isFree && (
          <>
            <Text>최소주문금액</Text>
            <InputNumber value={number} onChange={handleNumberChange} />
          </>
        )}
      </InputWrapper>
    </>
  );
}

export default MinimumAmountForFreeInput;

const InputWrapper = styled.div`
  width: 100%;
  height: 4rem;
`;
