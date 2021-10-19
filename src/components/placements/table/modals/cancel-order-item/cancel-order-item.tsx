import React, {useState} from 'react';
import styled from 'styled-components';
import {Modal, Checkbox, Button, Typography} from 'antd';
import {CheckboxChangeEvent} from 'antd/lib/checkbox';
import {palette} from '@pickk/design-token';

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
  onSubmit: (merchantUid: string, restock: boolean) => void;
};

export default function CancelOrderItemModal({
  isModalOpen,
  closeModal,
  merchantUid,
  onSubmit,
}: CancelOrderItemModalProps) {
  const [restock, setRestock] = useState(false);

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setRestock(e.target.checked);
  };

  const handleSubmit = () => {
    onSubmit(merchantUid, restock);
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
          value={restock}
          onChange={handleCheckboxChange}
          style={{color: palette.gray4}}>
          (재고 복구를 원하시면 체크해주세요)
        </Checkbox>
      </StyledRow>
      <Button style={{width: '100%'}} type="primary" onClick={handleSubmit}>
        주문취소
      </Button>
    </Modal>
  );
}
