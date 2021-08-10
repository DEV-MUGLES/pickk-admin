import React from 'react';
import styled from 'styled-components';
import {Modal, Button, Typography} from 'antd';

import {GREY} from '@src/components/common/atoms/colors';
import {useBoardContext} from '@src/contexts/Board';
import {RefundRequest} from '@src/types';
import RefundRequestService from '@src/lib/services/RefundRequest';
import Space from '@src/components/common/atoms/space';
import {addCommaToNumber} from '@src/lib/NumberParser';

const {Text} = Typography;

export type RefundConfirmModalProps = {
  record: RefundRequest;
  isModalOpen: boolean;
  closeModal: () => void;
};

export default function RefundConfirmModal({
  record,
  isModalOpen,
  closeModal,
}: RefundConfirmModalProps) {
  const {reload} = useBoardContext().action;

  const handleSubmit = (shippingFee?: 'FULL' | 'HALF') => async () => {
    await RefundRequestService.confirm(record.id, shippingFee);
    closeModal();
    reload();
  };

  if (record) {
    const {reason, refundAmount, subtractedShippingFee} = record;

    return (
      <Modal
        title="배송비 차감 여부를 선택해주세요."
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width="fit-content">
        <Wrapper>
          <Text>사유 : {reason}</Text>
          <Text>반품 배송비 : {addCommaToNumber(subtractedShippingFee)}원</Text>
          <Text>차감된 환불 금액 : {addCommaToNumber(refundAmount)}원</Text>
          <SubmitArea>
            <Button type="primary" onClick={handleSubmit()}>
              왕복 배송비 차감 환불 ({addCommaToNumber(refundAmount)}원)
            </Button>
            <Space />
            <Button type="primary" onClick={handleSubmit('HALF')}>
              편도 배송비 차감 환불 (
              {addCommaToNumber(refundAmount + subtractedShippingFee / 2)}원)
            </Button>
            <Space />
            <Button type="primary" onClick={handleSubmit('FULL')}>
              전액 환불 (
              {addCommaToNumber(refundAmount + subtractedShippingFee)}원)
            </Button>
          </SubmitArea>
        </Wrapper>
      </Modal>
    );
  }
  return <></>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  height: fit-content;
  overflow: auto;
`;

const SubmitArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: fit-content;
  border-top: 1px solid ${GREY[200]};
  padding-top: 16px;
`;
