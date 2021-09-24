import {ChangeEvent, useState} from 'react';
import styled from 'styled-components';
import {Modal, Input, Typography} from 'antd';
import {useUpdateOrderItemTrackCode} from './hooks';
import {useBoardContext} from '@src/common/contexts/Board';

const {Text} = Typography;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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
    updateOrderItemTrackCode(merchantUid, trackCode);
    setTrackCode('');

    reload();
  };

  return (
    <Modal
      title="송장수정"
      visible={visible}
      onCancel={onClose}
      onOk={handleSubmit}>
      <StyledRow>
        <Text style={{width: '10rem'}}>송장번호: </Text>
        <Input value={trackCode} onChange={handleChange} type="number" />
      </StyledRow>
    </Modal>
  );
}
