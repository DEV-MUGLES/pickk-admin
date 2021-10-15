import {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {Modal, Input, Typography, message} from 'antd';

import {useBoardContext} from '@src/common/contexts/Board';
import {removeDashFromNumber} from '@src/common/helpers';

import {useUpdateOrderItemTrackCode} from './hooks';

const {Text} = Typography;

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled(Input)`
  margin-top: 0.4rem;
`;

export type TrackCodeUpdateModalProps = {
  visible: boolean;
  onClose: () => void;
  merchantUid: string;
  defaultTrackCode: string;
};

export default function TrackCodeUpdateModal({
  visible,
  onClose,
  merchantUid,
  defaultTrackCode = '',
}: TrackCodeUpdateModalProps) {
  const {
    action: {reload},
  } = useBoardContext();

  const [trackCode, setTrackCode] = useState(defaultTrackCode);

  const {updateOrderItemTrackCode} = useUpdateOrderItemTrackCode();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTrackCode(e.target.value);
  };

  const handleSubmit = async () => {
    const parsedTrackCode = removeDashFromNumber(trackCode);

    if (parsedTrackCode.length !== 10 && parsedTrackCode.length !== 12) {
      message.warning('운송장 번호는 10자리 혹은 12자리입니다.');
      return;
    }

    try {
      await updateOrderItemTrackCode(merchantUid, parsedTrackCode);
      setTrackCode('');

      message.success('송장정보를 수정했습니다.');
      reload();
      onClose();
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
  };

  return (
    <StyledModal
      title="송장수정"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}>
      <Text>송장번호 (10자리 또는 12자리):</Text>
      <StyledInput value={trackCode} onChange={handleChange} />
    </StyledModal>
  );
}
