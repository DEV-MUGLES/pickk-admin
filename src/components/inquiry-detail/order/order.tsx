import styled from 'styled-components';
import {Typography} from 'antd';
import {palette} from '@pickk/design-token';
import {OrderItem, User} from '@pickk/common';

import {addDashToPhoneNumber} from '@src/common/helpers';

const {Text, Title} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-left: 1.6rem;
  border-left: 1px solid ${palette.gray2};
  padding-left: 1.6rem;
`;

type InquiryDetailOrderSectionProps = Pick<
  OrderItem,
  'id' | 'merchantUid' | 'productVariantName' | 'quantity'
> & {
  order: {
    buyer: Pick<User, 'id' | 'name' | 'phoneNumber'>;
  };
};

export default function InquiryDetailOrderSection(
  props: InquiryDetailOrderSectionProps,
) {
  const {productVariantName, merchantUid, quantity, order} = props;

  return (
    <StyledWrapper>
      <Title level={5}>주문 정보</Title>
      <Text>주문상품번호: {merchantUid}</Text>
      <Text>
        주문옵션 (수량): {productVariantName} ({quantity}개)
      </Text>
      <Text>구매자명: {order.buyer.name}</Text>
      <Text>전화번호: {addDashToPhoneNumber(order.buyer.phoneNumber)}</Text>
    </StyledWrapper>
  );
}
