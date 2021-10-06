import {Typography, Image} from 'antd';
import styled from 'styled-components';

const {Text} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledText = styled(Text)`
  margin-left: 0.4rem;
`;

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
      <Image src={imageUrl} alt={name} width={80} />
      <StyledText>{name}</StyledText>
    </StyledWrapper>
  );
}
