import {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {Modal, Input, Typography, message} from 'antd';
import {useUpdateOrderItemTrackCode} from './hooks';
import {useBoardContext} from '@src/common/contexts/Board';

const {Text} = Typography;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
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

  const handleSubmit = () => {
    if (trackCode.length !== 10 && trackCode.length !== 12) {
      message.warning('운송장 번호는 10자리 혹은 12자리입니다.');
      return;
    }

    try {
      updateOrderItemTrackCode(merchantUid, trackCode);
      setTrackCode('');

      message.success('송장정보를 수정했습니다.');
      reload();
      onClose();
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
  };

  return (
    <Modal
      title="송장수정"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}>
      <StyledColumn>
        <Text style={{marginBottom: '0.4rem'}}>
          송장번호 (10자리 또는 12자리):
        </Text>
        <Input value={trackCode} onChange={handleChange} type="number" />
      </StyledColumn>
    </Modal>
  );
}
