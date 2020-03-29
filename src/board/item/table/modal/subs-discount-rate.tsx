import React from 'react';
import styled from 'styled-components';
import {Modal, Typography} from 'antd';

import SubsDiscount from '@src/components/organisms/Board/Table/DiscountSection/subs-discount';

import {Item} from '@src/types';

import {useBoardContext} from '@src/contexts/Board';

const {Text} = Typography;

export type SubsDiscountRateModalProps = {
  visible: boolean;
  onClose: any;
  modalData: Item[];
};

export default function SubsDiscountRateModal({
  visible,
  onClose,
  modalData,
}: SubsDiscountRateModalProps) {
  const {reload} = useBoardContext().action;

  if (modalData) {
    return (
      <Modal
        title="구독할인율 설정"
        visible={visible}
        onCancel={() => {
          onClose();
          reload();
        }}
        footer={null}
        width="80%">
        <OptionsWrapper>
          <Row>
            <Name strong>상품명</Name>
            <InnerRow>
              <Label strong>SKU일련번호</Label>
              <Label strong>구독할인율 (현재)</Label>
              <Label strong>구독할인율 (설정)</Label>
              <TimeLabel strong>할인시작시점</TimeLabel>
              <TimeLabel strong>할인종료시점</TimeLabel>
              <Label strong>확인</Label>
            </InnerRow>
          </Row>
          {modalData.map(item => {
            const {id, skuPrefix, name, subsDiscountRate} = item;
            return (
              <SubsDiscount
                key={id}
                {...{id, name, skuPrefix, subsDiscountRate}}
              />
            );
          })}
        </OptionsWrapper>
      </Modal>
    );
  }
  return <></>;
}

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 80%;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;
`;

const Name = styled(Text).attrs({
  ellipsis: true,
})`
  width: 250px;
`;

const Label = styled(Text)`
  width: 100px;
  text-align: center;
`;

const TimeLabel = styled(Text)`
  width: 195px;
  text-align: center;
`;

const InnerRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
