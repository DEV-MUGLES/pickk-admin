import styled from 'styled-components';
import dayjs from 'dayjs';
import {Typography, Divider} from 'antd';
import {LockOutlined} from '@ant-design/icons';
import {Inquiry, User} from '@pickk/common';

import {getInquiryTypeDisplayName} from '@src/common/helpers';

import {INDIGO_BLUE, FIRE_RED, GREY} from '@src/common/constants/colors';

const {Text, Title} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.8rem;
  border: 1px solid ${GREY[200]};
`;

const StyledIsAnswered = ({isAnswered}: {isAnswered: boolean}) => (
  <Text strong style={{color: isAnswered ? INDIGO_BLUE[500] : FIRE_RED[500]}}>
    {isAnswered ? '답변완료' : '미답변'}
  </Text>
);

const StyledLockOutlined = () => (
  <LockOutlined style={{marginLeft: '0.4rem', color: GREY[500]}} />
);

const getCreatedAtText = (createdAt: Date) => {
  return `${dayjs(createdAt).format('YYYY.MM.DD hh:mm')} (${dayjs(
    createdAt,
  ).fromNow()})`;
};

type InquiryDetailContentSectionProps = Pick<
  Inquiry,
  'isAnswered' | 'isSecret' | 'type' | 'title' | 'content' | 'createdAt'
> & {
  user: Pick<User, 'id' | 'nickname'>;
};

export default function InquiryDetailContentSection(
  props: InquiryDetailContentSectionProps,
) {
  const {isAnswered, isSecret, type, title, content, createdAt, user} = props;

  return (
    <StyledWrapper>
      <Title level={5}>문의 내용</Title>
      <StyledContentWrapper>
        <StyledIsAnswered isAnswered={isAnswered} />
        <Text strong>
          [{getInquiryTypeDisplayName(type)}문의] {title}
          {isSecret && <StyledLockOutlined />}
        </Text>
        <Text>{content}</Text>
        <Divider />
        <Text>작성일시: {getCreatedAtText(createdAt)}</Text>
        <Text>작성자(닉네임): {user.nickname}</Text>
      </StyledContentWrapper>
    </StyledWrapper>
  );
}
