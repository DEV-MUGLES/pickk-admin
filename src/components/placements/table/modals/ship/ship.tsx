import React, {useState, useEffect, ChangeEvent, ReactNode} from 'react';
import styled from 'styled-components';
import {Modal, Input, Typography} from 'antd';
import {Shipment} from '@pickk/common';

import {removeDashFromNumber} from '@src/common/helpers';

import CourierSelect from './courier-select';

const {Text} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;

  & > *:not(:last-child) {
    margin-bottom: 0.4rem;
  }
`;

const Label = ({title, children}: {title: string; children: ReactNode}) => (
  <div>
    <Text strong>{title}</Text>
    <div>{children}</div>
  </div>
);

export type ShipModalDataType = {
  id: string;
  merchantUid: string;
  itemName: string;
  buyerName: string;
} & Pick<Shipment, 'courierId' | 'trackCode'>;

export type ShipmentType = Pick<
  ShipModalDataType,
  'id' | 'merchantUid' | 'courierId' | 'trackCode'
>;

export type ShipModalProps = {
  title?: string;
  modalData: ShipModalDataType;
  onSubmit: (shipment: ShipmentType) => void;
  isModalOpen: boolean;
  closeModal: () => void;
};

export default function ShipModal({
  title = '발송 처리',
  modalData,
  onSubmit,
  isModalOpen,
  closeModal,
}: ShipModalProps) {
  const [shipment, setShipment] = useState<ShipmentType>(null);

  useEffect(() => {
    if (!modalData) return;

    const {id, merchantUid, courierId, trackCode} = modalData;
    setShipment({
      id,
      merchantUid,
      courierId,
      trackCode,
    });
  }, [modalData]);

  const handleCourierIdChange = (courierId: number) => {
    setShipment({
      ...shipment,
      courierId,
    });
  };

  const handleTrackCodeChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setShipment({
      ...shipment,
      trackCode: e.target.value,
    });
  };

  const handleSubmit = async () => {
    await onSubmit({
      ...shipment,
      trackCode: removeDashFromNumber(shipment.trackCode),
    });

    closeModal();
  };

  if (modalData && shipment) {
    return (
      <Modal
        title={title}
        visible={isModalOpen}
        onCancel={closeModal}
        onOk={handleSubmit}>
        <StyledWrapper>
          <Label title="상품주문번호">{modalData.merchantUid}</Label>
          <Label title="상품명">{modalData.itemName}</Label>
          <Label title="구매자명">{modalData.buyerName}</Label>
          <Label title="택배사">
            <CourierSelect
              value={shipment.courierId ?? null}
              onChange={handleCourierIdChange}
            />
          </Label>
          <Label title="송장번호">
            <Input
              name="trackCode"
              value={shipment.trackCode ?? null}
              onChange={handleTrackCodeChange}
            />
          </Label>
        </StyledWrapper>
      </Modal>
    );
  }
  return <></>;
}
