import React from 'react';
import styled from 'styled-components';
import {Modal, Button, Typography, Space, Divider} from 'antd';
import {RefundRequest} from '@pickk/common';

import {
  addCommaToNumber,
  getOrderClaimFaultOfDisplayName,
} from '@src/common/helpers';

import {useMeSellerClaimPolicyFee} from './hooks';

const {Title, Text} = Typography;

const StyledWrapper = styled.div`
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
  onSubmit: (merchantUid: string, shippingFee: number) => void;
};

export default function RefundConfirmModal({
  record,
  isModalOpen,
  closeModal,
  onSubmit,
}: RefundConfirmModalProps) {
  const {claimPolicyFee} = useMeSellerClaimPolicyFee();

  const handleSubmit = (shippingFee: number) => async () => {
    onSubmit(record.merchantUid, shippingFee);
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
      <StyledWrapper>
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
              onClick={handleSubmit(Math.ceil(claimPolicyFee / 2))}>
              {addCommaToNumber(Math.ceil(claimPolicyFee / 2))}원 차감 환불
            </Button>
          </StyledRow>
          <StyledRow>
            <Text>단일 상품, 무료 배송 상품일 시</Text>
            <Button type="primary" onClick={handleSubmit(claimPolicyFee)}>
              {addCommaToNumber(claimPolicyFee)}원 차감 환불
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
      </StyledWrapper>
    </Modal>
  );
}
