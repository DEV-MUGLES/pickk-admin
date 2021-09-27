import {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {Typography, Divider, Input, Button, message} from 'antd';
import {Inquiry} from '@pickk/common';

import {GREY} from '@src/common/constants/colors';

import InquiryAnswerCard from './card';
import InquiryAnswerUpdateModal from './update-modal';

import {
  useInquiryAnswers,
  useAnswerInquiry,
  InquiryAnswerDataType,
} from './hooks';

const {Text, Title} = Typography;
const {TextArea} = Input;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;

  margin-left: 1.6rem;
  border-left: 1px solid ${GREY[200]};
  padding-left: 1.6rem;
`;

const StyledAnswersWrapper = styled.div`
  display: flex;
  flex-direction: column;

  padding: 0.8rem;
  margin-bottom: 0.8rem;
  border: 1px solid ${GREY[200]};
`;

const SyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledInput = styled(Input)`
  width: 8rem;
  margin-left: 0.4rem;
`;

const AnswerButton = (props: {disabled: boolean; onClick: () => void}) => (
  <Button
    type="primary"
    style={{height: '100%', marginLeft: '0.4rem'}}
    {...props}>
    답변하기
  </Button>
);

type InquiryDetailAnswerSectionProps = Pick<Inquiry, 'id'>;

export default function InquiryDetailAnswerSection(
  props: InquiryDetailAnswerSectionProps,
) {
  const {id: inquiryId} = props;

  const {data: answers = [], refetch: reload} = useInquiryAnswers(inquiryId);
  const {answerInquiry} = useAnswerInquiry();

  const [content, setContent] = useState('');
  const [displayAuthor, setDisplayAuthor] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAnswer, setSelectedAnswer] =
    useState<InquiryAnswerDataType>(null);

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDisplayAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayAuthor(e.target.value);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleAnswerButtonClick = async () => {
    try {
      await answerInquiry(inquiryId, content, displayAuthor);

      message.success('답변이 등록되었습니다.');

      reload();
      setContent('');
      setDisplayAuthor('');
    } catch (err) {
      message.success('실패했습니다. err - ' + err);
    }
  };

  const handleUpdateInquiryAnswer =
    (answer: InquiryAnswerDataType) => async () => {
      setSelectedAnswer(answer);
      setIsModalVisible(true);
    };

  const renderAnswers = () => {
    if (!answers?.length) {
      return <Text>등록된 답변이 없습니다</Text>;
    }

    return answers.map((answer, index) => (
      <>
        {index !== 0 && <Divider style={{margin: '0.8rem 0'}} />}
        <InquiryAnswerCard
          {...answer}
          onUpdateClick={handleUpdateInquiryAnswer(answer)}
        />
      </>
    ));
  };

  return (
    <>
      <StyledWrapper>
        <Title level={5}>문의 답변 ({answers.length} 개)</Title>
        <StyledAnswersWrapper>{renderAnswers()}</StyledAnswersWrapper>
        <SyledRow>
          <TextArea value={content} onChange={handleContentChange} />
          <AnswerButton
            disabled={!content || !displayAuthor}
            onClick={handleAnswerButtonClick}
          />
        </SyledRow>
        <SyledRow style={{marginTop: '0.4rem'}}>
          <Text>작성자: </Text>
          <StyledInput
            value={displayAuthor}
            onChange={handleDisplayAuthorChange}
          />
        </SyledRow>
      </StyledWrapper>
      {isModalVisible && (
        <InquiryAnswerUpdateModal
          visible={isModalVisible}
          onClose={handleModalClose}
          answer={selectedAnswer}
        />
      )}
    </>
  );
}
