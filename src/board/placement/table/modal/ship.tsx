import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, Input, Button, Typography} from 'antd';

import Colors from '@src/components/atoms/colors';
import {useBoardContext} from '@src/contexts/Board';
import {Placement} from '@src/types';
import OrderItemService from '@src/lib/services/OrderItem';

const {Text} = Typography;

export type ShipModalProps = {
  modalData: Placement[];
  isModalOpen: boolean;
  closeModal: () => void;
};

export default function ShipModal({
  modalData,
  isModalOpen,
  closeModal,
}: ShipModalProps) {
  const {action} = useBoardContext();
  const {reload} = action;
  const [shipments, setShipments] = useState(null);

  useEffect(() => {
    if (!modalData) return;
    setShipments(
      modalData.map((record) => {
        const {merchantUid, courier, trackingCode} = record;
        return {
          merchantUid,
          courier,
          trackingCode,
        };
      }),
    );
  }, [modalData]);

  const handleShipmentsChange = (index) => async (e) => {
    setShipments([
      ...shipments.slice(0, index),
      {
        ...shipments[index],
        [e.target.name]: e.target.value,
      },
      ...shipments.slice(index + 1, shipments.length),
    ]);
  };

  const handleSubmit = async () => {
    console.log(shipments);
    await OrderItemService.ship(shipments);
    closeModal();
    reload();
  };

  if (modalData && shipments && shipments.length !== 0) {
    console.log(modalData, shipments);
    return (
      <Modal
        title="발송 처리"
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
          {modalData.map((placement, index) => {
            const {id, merchantUid, itemName, buyerName} = placement;
            return (
              <Row key={id} style={{width: 'fit-content'}}>
                <MerchantUid>{merchantUid}</MerchantUid>
                <ItemName>{itemName}</ItemName>
                <BuyerName>{buyerName}</BuyerName>
                <StyledInput
                  size="small"
                  name="courier"
                  value={shipments[index] ? shipments[index].courier : null}
                  onChange={handleShipmentsChange(index)}
                />
                <StyledInput
                  size="small"
                  name="trackingCode"
                  value={
                    shipments[index] ? shipments[index].trackingCode : null
                  }
                  onChange={handleShipmentsChange(index)}
                />
              </Row>
            );
          })}
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
  border-top: 1px solid ${Colors.LightGrey};
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
