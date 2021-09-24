import {Typography} from 'antd';
import styled from 'styled-components';

import {Img} from '@src/components/common/atoms';

const {Text} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledImg = styled(Img).attrs({width: '4rem'})``;

type InquiriesTableItemCardProps = {
  imageUrl: string;
  name: string;
};

export default function InquiriesTableItemCard({
  imageUrl,
  name,
}: InquiriesTableItemCardProps) {
  return (
    <StyledWrapper>
      <StyledImg src={imageUrl} alt={name} />
      <Text>{name}</Text>
    </StyledWrapper>
  );
}
