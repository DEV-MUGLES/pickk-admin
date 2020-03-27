import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, InputNumber, Button, message, Typography} from 'antd';

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
  const {data: products, loading, error} = useProductList([id]);

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

  const handleStockSubmit = index => async () => {
    if (stocks[index] === null) {
      message.error('수량을 올바르게 입력해주세요.');
    } else {
      try {
        await ProductService.setStock(id, stocks[index]);
        message.success(`수량이 ${stocks[index]}(으)로 변경되었습니다.`);
      } catch (err) {
        message.error('err');
      }
    }
  };

  if (products) {
    return (
      <Modal
        title="재고 관리"
        visible={id >= 0}
        onCancel={closeModal}
        footer={null}>
        <OptionsWrapper>
          {products.map((product, index) => {
            const {sku, options, stock, priceVariant} = product;
            const optionsStr = options.join('/');
            return (
              <>
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
                  <Button
                    type="primary"
                    size="small"
                    shape="round"
                    onClick={handleStockSubmit(index)}>
                    수정
                  </Button>
                </OptionsRow>
              </>
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
