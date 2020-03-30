import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, InputNumber, Button, message, Typography, Spin} from 'antd';

import {useProductList} from '@src/hooks/table';
import ProductService from '@src/lib/services/Product';
import {addCommaToNumber} from '@src/lib/NumberParser';
import Space from '@src/components/atoms/space';

const {Text} = Typography;

export type StockModalProps = {
  id: number;
  closeModal: () => void;
};

export default function StockModal({id, closeModal}: StockModalProps) {
  const [stocks, setStocks] = useState([]);
  const {data: products, loading} = useProductList([id]);

  useEffect(() => {
    if (products) {
      const initStocks = products.map(product => product.stock);
      setStocks(initStocks);
    }
  }, [products]);

  const handleStockInput = index => value => {
    setStocks([
      ...stocks.slice(0, index),
      value,
      ...stocks.slice(index + 1, stocks.length),
    ]);
  };

  const handleStockSubmit = async () => {
    const ids = products.map(product => product.id);
    if (!stocks.every(stock => stock !== null)) {
      message.error('수량을 올바르게 입력해주세요.');
      return;
    }

    const stockData = ids.map((id, index) => {
      return {
        id,
        stock: stocks[index],
      };
    });

    try {
      await ProductService.setStock(stockData);
      message.success(`수량이 일괄 적용되었습니다.`);
    } catch (err) {
      message.error('err');
    } finally {
      closeModal();
    }
  };

  return (
    <Modal
      title="재고 관리"
      visible={id >= 0}
      onCancel={closeModal}
      footer={null}>
      <OptionsWrapper>
        {loading && <Spin tip="Loading..." />}
        {products &&
          products.map((product, index) => {
            const {id, sku, options, stock, priceVariant} = product;
            const optionsStr = options.join('/');
            return (
              <React.Fragment key={id}>
                <OptionsRow>
                  <Text>{sku}</Text>
                  <Space direction="ROW" level={2} />
                  <Options>{optionsStr}</Options>
                  <Space direction="ROW" level={2} />
                  <OptionPrice>
                    {addCommaToNumber(priceVariant) + '원'}
                  </OptionPrice>
                  <Space direction="ROW" level={4} />
                  <StockInput
                    min={0}
                    max={10000}
                    size="small"
                    defaultValue={stock}
                    onChange={handleStockInput(index)}
                  />
                  <Text>개</Text>
                  <Space direction="ROW" level={2} />
                </OptionsRow>
              </React.Fragment>
            );
          })}
      </OptionsWrapper>
      <Space level={1} />
      <Button
        style={{width: '100%'}}
        type="primary"
        size="default"
        shape="round"
        onClick={handleStockSubmit}>
        일괄 적용
      </Button>
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

const OptionsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 8px;
`;

const Options = styled(Text).attrs({
  ellipsis: true,
})`
  width: 150px;
`;

const OptionPrice = styled(Text)`
  width: 70px;
  margin-right: auto;
`;

const StockInput = styled(InputNumber)`
  width: 60px;
`;
