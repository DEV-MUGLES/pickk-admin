import React, {useState} from 'react';
import styled from 'styled-components';
import {Modal, Checkbox, Button, message, Typography} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';

import {GREY} from '@src/common/constants/colors';

import {useCancelMeSellerOrderItem} from './hooks';
import {useBoardContext} from '@src/common/contexts/Board';

const {Text} = Typography;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 0.8rem;
`;

export type CancelOrderItemModalProps = {
  isModalOpen: boolean;
  closeModal: () => void;
  merchantUid: string;
};

export default function CancelOrderItemModal({
  isModalOpen,
  closeModal,
  merchantUid,
}: CancelOrderItemModalProps) {
  const {
    action: {reload},
  } = useBoardContext();

  const [restore, setRestore] = useState(false);

  const {cancelMeSellerOrderItem} = useCancelMeSellerOrderItem();

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setRestore(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      await cancelMeSellerOrderItem(merchantUid, restore);

      message.success(`취소 완료되었습니다.`);
      reload();
    } catch (error) {
      message.error('실패했습니다. - ' + error);
    } finally {
      closeModal();
    }
  };

  return (
    <Modal
      title="주문취소"
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}>
      <StyledRow>
        <Text>취소된 재고를 복구하시겠습니까?</Text>
        <Checkbox
          value={restore}
          onChange={handleCheckboxChange}
          style={{color: GREY[500]}}>
          (재고 복구를 원하시면 체크해주세요)
        </Checkbox>
      </StyledRow>
      <Button style={{width: '100%'}} type="primary" onClick={handleSubmit}>
        주문취소
      </Button>
    </Modal>
  );
}
