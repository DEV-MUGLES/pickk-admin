import React from 'react';
import styled from 'styled-components';
import {Modal, Button, Typography, Space, Divider, message} from 'antd';
import {RefundRequest} from '@pickk/common';

import {useBoardContext} from '@src/common/contexts/Board';
import {addCommaToNumber} from '@src/common/helpers/NumberParser';
import {getOrderClaimFaultOfDisplayName} from '@src/common/helpers';

import {useConfirmRefundRequest, useMeSellerClaimPolicyFee} from './hooks';

const {Title, Text} = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin: 0 3.2rem;
`;

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

  const {claimPolicyFee} = useMeSellerClaimPolicyFee();
  const {confirmRefundRequest} = useConfirmRefundRequest();

  const handleSubmit = (shippingFee: number) => async () => {
    try {
      await confirmRefundRequest(record.merchantUid, shippingFee);

      message.success('반품이 완료되었습니다.');
      reload();
      closeModal();
    } catch (err) {
      message.error('실패했습니다. err - ' + err);
    }
  };

  if (!record || claimPolicyFee == null) {
    return <></>;
  }

  const {reason, faultOf} = record;

  return (
    <Modal
      title="배송비 차감 여부를 선택해주세요."
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}
      width={'70%'}>
      <Wrapper>
        <Text>
          클레임 사유 :{' '}
          {`[${getOrderClaimFaultOfDisplayName(faultOf)}] ${reason}`}
        </Text>
        <Divider />
        <Space direction="vertical">
          <Title level={5}>구매자 귀책 사유</Title>
          <StyledRow>
            <Text>합배송 상품이거나 유료배송 상품일 시</Text>
            <Button
              type="primary"
              onClick={handleSubmit(Math.ceil(claimPolicyFee))}>
              {addCommaToNumber(Math.ceil(claimPolicyFee))}원 차감 환불
            </Button>
          </StyledRow>
          <StyledRow>
            <Text>단일 상품, 무료 배송 상품일 시</Text>
            <Button type="primary" onClick={handleSubmit(claimPolicyFee * 2)}>
              {addCommaToNumber(claimPolicyFee * 2)}원 차감 환불
            </Button>
          </StyledRow>
          <Divider />
          <Title level={5}>판매자 귀책 사유</Title>
          <StyledRow>
            <Text>상품 오발송, 제품결함일 시</Text>
            <Button type="primary" onClick={handleSubmit(0)}>
              전액 환불
            </Button>
          </StyledRow>
        </Space>
      </Wrapper>
    </Modal>
  );
}
