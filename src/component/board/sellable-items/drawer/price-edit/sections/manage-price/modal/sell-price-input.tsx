import styled from 'styled-components';
import {ChangeEvent} from 'react';
import {Checkbox, Typography} from 'antd';

import InputNumber from '@src/components/organisms/Form/Items/input-number';
import {GREY} from '@src/components/atoms/colors';
import {CustomInputProps} from '@src/components/organisms/Form/base';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

const {Text} = Typography;

export type PriceType = {
  originalPrice: number;
  sellPrice: number;
};

export type PriceInputValueType = PriceType & {isCrawlUpdating: boolean};
export type PriceInputProps = CustomInputProps<PriceInputValueType> & {
  basePrice: PriceType;
};

function PriceInput({
  value = {
    originalPrice: 0,
    sellPrice: 0,
    isCrawlUpdating: false,
  },
  onChange,
  basePrice,
}: PriceInputProps) {
  const {originalPrice, sellPrice, isCrawlUpdating} = value;

  const handleInputNumberChange = ({
    target: {name, value: _value},
  }: ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      ...value,
      [name]: parseInt(_value),
    });
  };

  const handleCheckboxChange = ({target: {checked}}: CheckboxChangeEvent) => {
    onChange?.({
      ...value,
      isCrawlUpdating: checked,
      ...(checked && {
        originalPrice: basePrice.originalPrice,
        sellPrice: basePrice.sellPrice,
      }),
    });
  };

  return (
    <>
      <Row>
        <Label>정가 : </Label>
        <InputNumber
          name="originalPrice"
          value={isCrawlUpdating ? basePrice.originalPrice : originalPrice}
          onChange={handleInputNumberChange}
          disabled={isCrawlUpdating}
          suffix="원"
          style={{marginBottom: '0.4rem'}}
        />
      </Row>
      <Row>
        <Label>판매가 : </Label>
        <InputNumber
          name="sellPrice"
          value={isCrawlUpdating ? basePrice.sellPrice : sellPrice}
          onChange={handleInputNumberChange}
          disabled={isCrawlUpdating}
          suffix="원"
        />
      </Row>
      <div style={{marginTop: '0.6rem'}}>
        <Checkbox checked={isCrawlUpdating} onChange={handleCheckboxChange} />
        <Text style={{marginLeft: '0.4rem', color: GREY[600]}}>
          {isCrawlUpdating
            ? '크롤링 연동가로 가격 설정 '
            : '수동설정가격 적용중 '}
          ✅
        </Text>
      </div>
    </>
  );
}

export default PriceInput;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Label = styled(Text)`
  width: 6rem;
`;

export const checkPriceEmpty = async (
  _,
  {originalPrice, sellPrice}: PriceInputValueType,
) => {
  if (originalPrice > 0 && sellPrice > 0) {
    return;
  }

  throw new Error('정가와 판매가를 모두 입력해주세요');
};
