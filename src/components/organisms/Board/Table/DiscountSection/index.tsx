import React from 'react';
import styled from 'styled-components';

import InfluencerDiscountSection, {
  InfluencerDiscountSectionProps,
} from './Influencer';
import SubscriptionDiscountRow, {
  DiscountRowProps,
} from '@src/components/molecules/Row/Discount/Subscription';
import Space from '@src/components/atoms/space';

export type DiscountSectionProps = DiscountRowProps &
  InfluencerDiscountSectionProps;

export default function DiscountSection(props: DiscountSectionProps) {
  const discountRowProps: DiscountRowProps = props;
  const influencerDiscountSectionProps: InfluencerDiscountSectionProps = props;
  return (
    <Wrapper>
      <Space />
      <SubscriptionDiscountRow {...discountRowProps} />
      <Space level={2} />
      <InfluencerDiscountSection {...influencerDiscountSectionProps} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  margin-left: 60px;
`;
