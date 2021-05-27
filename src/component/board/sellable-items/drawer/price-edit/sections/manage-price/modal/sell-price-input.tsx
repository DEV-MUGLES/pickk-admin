import styled from 'styled-components';
import {useEffect, useState} from 'react';
import {Checkbox, Input, Typography} from 'antd';

import {GREY} from '@src/components/atoms/colors';

const {Text} = Typography;

export type PriceType = {
  originalPrice: number;
  sellPrice: number;
};

export type PriceInputProps = {
  value?: any;
  onChange?: (value) => void;
  basePrice: PriceType;
  defaultValue?: {
    originalPrice: number;
    sellPrice: number;
    isCrawlUpdating: boolean;
  };
};

function PriceInput({
  value,
  onChange,
  basePrice,
  defaultValue = {
    originalPrice: 0,
    sellPrice: 0,
    isCrawlUpdating: false,
  },
}: PriceInputProps) {
  const [price, setPrice] = useState<PriceType>({
    originalPrice: defaultValue.originalPrice,
    sellPrice: defaultValue.sellPrice,
  });
  const [isCrawlUpdating, setIsCrawlUpdating] = useState(
    defaultValue.isCrawlUpdating,
  );

  /**
   * 초기 랜더링 시 antd에서 triggerChange를 호출하지 않아
   * defaultValue가 있을 때 required 에러 메세지를 출력하는 문제 해결
   *  */
  useEffect(() => {
    if (defaultValue.originalPrice !== 0) {
      triggerChange({price, isCrawlUpdating});
    }
  }, []);

  const triggerChange = (changedValue) => {
    onChange?.({
      price,
      isCrawlUpdating,
      ...value,
      ...changedValue,
    });
  };

  const handleInputNumberChange =
    (name) =>
    ({target: {value}}) => {
      const newNumber = parseInt(value || '0', 10);

      if (Number.isNaN(value)) {
        return;
      }

      const newPrice = {
        ...price,
        [name]: newNumber,
      };

      setPrice(newPrice);

      triggerChange({
        price: newPrice,
      });
    };

  const handleCheckboxChange = ({target: {checked}}) => {
    setIsCrawlUpdating(checked);

    triggerChange({
      isCrawlUpdating: checked,
      price: checked ? basePrice : price,
    });
  };

  return (
    <>
      <Row>
        <Label>정가 : </Label>
        <Input
          value={
            isCrawlUpdating ? basePrice.originalPrice : price.originalPrice
          }
          onChange={handleInputNumberChange('originalPrice')}
          disabled={isCrawlUpdating}
          suffix="원"
          style={{marginBottom: '0.4rem'}}
        />
      </Row>
      <Row>
        <Label>판매가 : </Label>
        <Input
          value={isCrawlUpdating ? basePrice.sellPrice : price.sellPrice}
          onChange={handleInputNumberChange('sellPrice')}
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
