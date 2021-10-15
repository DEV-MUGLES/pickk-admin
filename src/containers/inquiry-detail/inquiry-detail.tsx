import styled from 'styled-components';
import {palette} from '@pickk/design-token';

import {
  InquiryDetailItemSection,
  InquiryDetailOrderSection,
  InquiryDetailContentSection,
  InquiryDetailAnswerSection,
} from '@src/components/inquiry-detail';

import {useInquiry} from './hooks';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledSection = styled.div`
  display: flex;
  flex-direction: row;

  padding: 1.2rem 1.6rem;
  margin-bottom: 0.8rem;

  background-color: ${palette.white};
`;

export type InquiryDetailContainerProps = {
  id: number;
};

export default function InquiryDetailContainer({
  id,
}: InquiryDetailContainerProps) {
  const {data, loading} = useInquiry(id);

  if (loading) {
    return <StyledSection>로딩중...</StyledSection>;
  }

  if (!data && !loading) {
    return <StyledSection>문의가 없습니다.</StyledSection>;
  }

  const {item, orderItemMerchantUid, orderItem} = data;

  return (
    <StyledWrapper>
      <StyledSection>
        <InquiryDetailItemSection {...item} />
        {!!orderItemMerchantUid && !!orderItem && (
          <InquiryDetailOrderSection {...orderItem} />
        )}
      </StyledSection>
      <StyledSection>
        <InquiryDetailContentSection {...data} />
        <InquiryDetailAnswerSection id={id} />
      </StyledSection>
    </StyledWrapper>
  );
}
