import styled from 'styled-components';
import {Typography, Image} from 'antd';
import {Item} from '@pickk/common';

const {Text, Title, Link} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledCol = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

type InquiryDetailItemSectionProps = Pick<Item, 'id' | 'imageUrl' | 'name'>;

export default function InquiryDetailItemSection(
  props: InquiryDetailItemSectionProps,
) {
  const {id, imageUrl, name} = props;

  return (
    <StyledWrapper>
      <Title level={5}>상품 정보</Title>
      <StyledRow>
        <Image src={imageUrl} alt={name} width={'5rem'} />
        <StyledCol>
          <Text>{name}</Text>
          <Link href={`https://pickk.one/items/${id}`} target="_blank">
            핔 공홈링크
          </Link>
        </StyledCol>
      </StyledRow>
    </StyledWrapper>
  );
}
