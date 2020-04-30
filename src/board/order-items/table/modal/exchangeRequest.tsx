import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Modal, Input, Typography, Select, message} from 'antd';

import Space from '@src/components/atoms/space';

import {useBoardContext} from '@src/contexts/Board';
import OrderItemService from '@src/lib/services/OrderItem';
import RefundRequestService from '@src/lib/services/RefundRequest';
import {useItemOptions} from '@src/hooks/Item';
import {ItemOption} from '@src/types';

const {Text} = Typography;
const {Option} = Select;

export type ExchangeRequestModalProps = {
  id: number;
  itemId: number;
  isModalOpen: boolean;
  closeModal: () => void;
  claimed: boolean;
};

export default function ExchangeRequestModal({
  id,
  itemId,
  isModalOpen,
  closeModal,
  claimed,
}: ExchangeRequestModalProps) {
  const [options, setOptions] = useState<ItemOption>({});
  const [reason, setReason] = useState('');

  const {reload} = useBoardContext().action;

  const {data} = useItemOptions([itemId]);

  useEffect(() => {
    if (data) {
      setOptions(
        Object.keys(data.options.values).reduce((acc, curr) => {
          return {...acc, [curr]: ''};
        }, {}),
      );
    }
  }, [data]);

  const resetModal = () => {
    setOptions({});
    setReason('');
    closeModal();
  };

  const isValid = () => {
    if (!Object.keys(options).every((key) => options[key] !== '')) {
      message.warning('교환 옵션을 모두 선택해주세요');
      return false;
    }
    if (!claimed && reason === '') {
      message.warning('교환 사유를 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isValid()) {
      return;
    }
    try {
      if (claimed) {
        await RefundRequestService.switchToExchangeRequest(id, options);
      } else {
        await OrderItemService.exchangeRequest(id, options, reason);
      }
      resetModal();
    } catch {}
    reload();
  };

  const handleOptionChange = (name: string) => (value: string) => {
    setOptions({
      ...options,
      [name]: value,
    });
  };

  if (data) {
    const {values} = data.options;

    return (
      <Modal
        title="교환으로 변경"
        visible={isModalOpen}
        onOk={handleSubmit}
        onCancel={resetModal}
        width="fit-content">
        <Wrapper>
          <SectionTitle>교환 옵션</SectionTitle>
          {Object.keys(values).map((valueName) => (
            <>
              <Select
                defaultValue=""
                key={valueName}
                onChange={handleOptionChange(valueName)}>
                <Option value="" disabled>
                  {valueName}
                </Option>
                {values[valueName].map((v, i) => (
                  <Option key={i} value={v}>
                    {v}
                  </Option>
                ))}
              </Select>
              <Space level={1} />
            </>
          ))}
          {!claimed && (
            <>
              <SectionTitle>교환 사유</SectionTitle>
              <Input
                value={reason}
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </>
          )}
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

const SectionTitle = styled(Text)`
  font-size: 0.8rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.4rem;
`;
