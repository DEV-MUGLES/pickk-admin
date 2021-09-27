import styled from 'styled-components';
import dayjs from 'dayjs';
import {Typography, Button} from 'antd';
import {InquiryAnswer} from '@pickk/common';

const {Text} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 0.4rem;
`;

const StyledText = styled(Text)`
  margin-bottom: 0.4rem;
`;

const SyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const getCreatedAtText = (createdAt: Date) => {
  return `${dayjs(createdAt).format('YYYY.MM.DD hh:mm')} (${dayjs(
    createdAt,
  ).fromNow()})`;
};

type InquiryAnswerCardProps = Pick<
  InquiryAnswer,
  'id' | 'content' | 'displayAuthor' | 'createdAt'
> & {
  onUpdateClick: () => void;
};

export default function InquiryAnswerCard(props: InquiryAnswerCardProps) {
  const {id, content, createdAt, displayAuthor, onUpdateClick} = props;

  return (
    <StyledWrapper key={id}>
      <StyledText>{content}</StyledText>
      <SyledRow>
        <Text>
          {getCreatedAtText(createdAt)} {displayAuthor}
        </Text>
        <Button onClick={onUpdateClick}>수정</Button>
      </SyledRow>
    </StyledWrapper>
  );
}
