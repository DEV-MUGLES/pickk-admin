import {ChangeEvent, useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, Alert, Input, Typography, message} from 'antd';
import {InquiryAnswer} from '@pickk/common';

import {useMeSeller} from '@src/common/hooks/apis';
import {useAnswerInquiry} from '@src/components/inquiry-detail/answer/hooks';

import AnswerList from './answer-list';

const {Text} = Typography;
const {TextArea} = Input;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin-top: 0.8rem;
`;

const StyledInput = styled(Input)`
  width: 6rem;
  margin-left: 0.4rem;
`;

const StyledAlert = styled(Alert).attrs({
  showIcon: true,
  type: 'warning',
})`
  margin-top: 1.6rem;
`;

export type InquiryAnswerModalProps = {
  inquiryId: number;
  answers?: Pick<
    InquiryAnswer,
    'id' | 'content' | 'displayAuthor' | 'createdAt'
  >[];
  visible: boolean;
  onClose: () => void;
  reload: () => void;
};

export default function InquiryAnswerModal(props: InquiryAnswerModalProps) {
  const {inquiryId, answers = [], visible, onClose, reload} = props;

  const [content, setContent] = useState('');
  const [displayAuthor, setDisplayAuthor] = useState('');

  const {answerInquiry} = useAnswerInquiry();
  const {data} = useMeSeller();

  useEffect(() => {
    if (!data) {
      return;
    }
    setDisplayAuthor(data.name);
  }, [data]);

  const answer = async () => {
    if (!content) {
      message.warning(`답변을 입력해주세요`);
      return;
    }

    if (!displayAuthor) {
      message.warning(`담당자명을 입력해주세요`);
      return;
    }

    try {
      await answerInquiry(inquiryId, content, displayAuthor);

      message.success('답변이 정상적으로 등록되었습니다.');

      setContent('');
      setDisplayAuthor('');
      onClose();
      reload();
    } catch (err) {
      message.error(`답변 등록에 실패 했습니다. ${err}`);
    }
  };

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleDisplayAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayAuthor(e.target.value);
  };

  return (
    <Modal visible={visible} onOk={answer} onCancel={onClose} title="답변달기">
      <TextArea value={content} onChange={handleContentChange} />
      <StyledRow>
        <Text>담당자명: </Text>
        <StyledInput
          value={displayAuthor}
          onChange={handleDisplayAuthorChange}
        />
      </StyledRow>
      <StyledAlert
        message={`기존 답변에 추가적인 답변으로 등록됩니다. (이미 등록된 답변 개수: ${answers.length})`}
      />
      <AnswerList answers={answers} />
    </Modal>
  );
}
