import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, Input, Button, Typography} from 'antd';

import {GREY} from '@src/common/constants/colors';

import {useBoardContext} from '@src/common/contexts/Board';
import {Shipment} from '@pickk/common';

const {Text} = Typography;

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
  const {action} = useBoardContext();
  const {reload} = action;

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

  const handleShipmentsChange = async (e) => {
    setShipment({
      ...shipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    onSubmit(shipment);

    closeModal();
    reload();
  };

  if (modalData && shipment) {
    return (
      <Modal
        title={title}
        visible={isModalOpen}
        onCancel={closeModal}
        footer={null}
        width="fit-content">
        <OptionsWrapper>
          <Row style={{width: 'fit-content'}}>
            <MerchantUid strong>상품주문번호</MerchantUid>
            <ItemName strong>상품명</ItemName>
            <BuyerName strong>구매자명</BuyerName>
            <Courier strong>택배사</Courier>
            <TrackingCode strong>송장번호</TrackingCode>
          </Row>
          {modalData && (
            <Row key={modalData.id} style={{width: 'fit-content'}}>
              <MerchantUid>{modalData.merchantUid}</MerchantUid>
              <ItemName>{modalData.itemName}</ItemName>
              <BuyerName>{modalData.buyerName}</BuyerName>
              <StyledInput
                size="small"
                name="courierId"
                value={shipment.courierId ?? null}
                onChange={handleShipmentsChange}
              />
              <StyledInput
                size="small"
                name="trackCode"
                value={shipment.trackCode ?? null}
                onChange={handleShipmentsChange}
              />
            </Row>
          )}
        </OptionsWrapper>
        <SubmitArea>
          <Button type="primary" onClick={handleSubmit}>
            완료
          </Button>
        </SubmitArea>
      </Modal>
    );
  }
  return <></>;
}

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 500px;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  margin-bottom: 8px;
`;

const StyledInput = styled(Input)`
  width: 150px;
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

const MerchantUid = styled(Text)`
  width: 300px;
`;

const ItemName = styled(Text)`
  width: 250px;
`;

const BuyerName = styled(Text)`
  width: 75px;
`;

const Courier = styled(Text)`
  width: 150px;
`;

const TrackingCode = styled(Text)`
  width: 150px;
`;
