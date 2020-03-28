import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, InputNumber, Button, message, Typography} from 'antd';

import Colors from '@src/components/atoms/colors';
import ItemService from '@src/lib/services/Item';
import {useBoardContext} from '@src/contexts/Board';

const {Text} = Typography;

export type StockInitModalProps = {
  modalData: any;
  isModalOpen: boolean;
  closeModal: () => void;
};

export default function StockInitModal({
  modalData,
  isModalOpen,
  closeModal,
}: StockInitModalProps) {
  const {action} = useBoardContext();
  const {reload} = action;
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    setStocks(modalData.map(() => 5));
  }, [modalData]);

  const handleStockInput = index => value => {
    setStocks([
      ...stocks.slice(0, index),
      value,
      ...stocks.slice(index + 1, stocks.length),
    ]);
  };

  const handleSubmit = async () => {
    const items = modalData.map((item, index) => ({
      id: item.id,
      stock: stocks[index],
    }));
    await ItemService.manageStockOn(items);
    message.success('완료되었습니다.');
    closeModal();
    reload();
  };

  return (
    <Modal
      title="재고 관리 ON"
      visible={isModalOpen}
      onCancel={closeModal}
      footer={null}>
      <OptionsWrapper>
        <Row>
          <Name strong>상품명</Name>
          <Sku strong>SKU일련번호</Sku>
          <Stock strong>재고</Stock>
        </Row>
        {modalData.map((item, index) => {
          const {id, skuPrefix, name} = item;
          return (
            <React.Fragment key={id}>
              <Row>
                <Name>{name}</Name>
                <Sku>{skuPrefix}</Sku>
                <StockInput
                  min={1}
                  max={10000}
                  size="small"
                  defaultValue={5}
                  onChange={handleStockInput(index)}
                />
                <Text>개</Text>
              </Row>
            </React.Fragment>
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

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 300px;
  overflow: auto;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;
`;

const StockInput = styled(InputNumber)`
  width: 60px;
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

const Name = styled(Text).attrs({
  ellipsis: true,
})`
  width: 250px;
  margin-right: auto;
`;

const Sku = styled(Text)`
  width: 100px;
`;

const Stock = styled(Text)`
  width: 75px;
`;
