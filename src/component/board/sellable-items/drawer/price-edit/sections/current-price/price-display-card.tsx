import React from 'react';
import styled from 'styled-components';
import {Card, CardProps, Space, Typography} from 'antd';
import dayjs from 'dayjs';

import {addCommaToNumber} from '@src/lib/NumberParser';

const {Text} = Typography;

export type PriceDisplayCardProps = Pick<CardProps, 'title'> & {
  originalPrice: number;
  sellPrice: number;
  finalPrice: number;
  startAt: Date;
  endAt: Date;
};

function PriceDisplayCard({
  title,
  originalPrice,
  sellPrice,
  finalPrice,
  startAt,
  endAt,
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
        <Text>
          <Label strong>시작일:</Label>{' '}
          {startAt ? dayjs(startAt).format('YYYY/MM/DD') : '지정안함'}
        </Text>
        <Text>
          <Label strong>종료일:</Label>{' '}
          {endAt ? dayjs(endAt).format('YYYY/MM/DD') : '지정안함'}
        </Text>
      </Space>
    </Card>
  );
}

export default React.memo(PriceDisplayCard);

const Label = styled(Text)`
  display: inline-block;
  width: 3.2rem;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;
`;
