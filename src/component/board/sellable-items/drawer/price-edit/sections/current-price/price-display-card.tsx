import styled from 'styled-components';
import {Card, CardProps, Space, Typography} from 'antd';

import {addCommaToNumber} from '@src/lib/NumberParser';

const {Text} = Typography;

export type PriceDisplayCardProps = Pick<CardProps, 'title'> & {
  originalPrice: number;
  sellPrice: number;
  finalPrice: number;
};

function PriceDisplayCard({
  title,
  originalPrice,
  sellPrice,
  finalPrice,
}: PriceDisplayCardProps) {
  return (
    <Card style={{flex: 1}}>
      <Space direction="vertical">
        <TitleWrapper>{title}</TitleWrapper>
        <Text>
          <Label strong>정가:</Label> {addCommaToNumber(originalPrice)} 원
        </Text>
        <Text>
          <Label strong>공급가:</Label> {addCommaToNumber(sellPrice)} 원
        </Text>
        <Text>
          <Label strong>판매가:</Label> {addCommaToNumber(finalPrice)} 원
        </Text>
      </Space>
    </Card>
  );
}

export default PriceDisplayCard;

const Label = styled(Text)`
  display: inline-block;
  width: 3.2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;
