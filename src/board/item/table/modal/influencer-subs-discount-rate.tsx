import React, {useState} from 'react';
import styled from 'styled-components';
import {Modal, Typography, Button, Tooltip, message} from 'antd';

import InfluencerDiscountRow, {
  InfluencerDiscountProps,
} from '@src/components/molecules/Row/Discount/Influencer';
import Space from '@src/components/atoms/space';
import InfluencerDiscountSetModal from '@src/components/organisms/Modal';
import SubsDiscount from '@src/components/organisms/Board/Table/DiscountSection/subs-discount';

import {Item} from '@src/types';

import {useBoardContext} from '@src/contexts/Board';
import {useItemDiscountsList} from '@src/hooks/Item';

const {Text} = Typography;

export type SubsDiscountRateModalProps = {
  index: number;
  onClose: any;
};

export default function SubsDiscountRateModal({
  index,
  onClose,
}: SubsDiscountRateModalProps) {
  const {reload} = useBoardContext().action;
  const [toRerender, setToRerender] = useState(0);
  const {data: discounts} = useItemDiscountsList([index, toRerender]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  console.log(index, discounts);

  return (
    <Modal
      title="구독할인율 설정"
      visible={!!index}
      onCancel={() => {
        onClose();
        reload();
      }}
      footer={null}
      width="80%">
      <Wrapper>
        <TitleRow>
          <Text strong>인플루언서별 할인율</Text>
          <Space direction="ROW" />
          <Tooltip
            placement="right"
            title="인플루언서별, 기간별로 할인율을 지정합니다.">
            <GuideButton shape="circle" icon="question" />
          </Tooltip>
        </TitleRow>
        <Space level={1} />
        {discounts?.map((discount, index) => (
          <React.Fragment key={discount.id}>
            <InfluencerDiscountRow
              {...{index}}
              data={discount}
              onChange={() => setToRerender(toRerender + 1)}
            />
            <Space />
          </React.Fragment>
        ))}
        <Space />
        <Button type="primary" size="small" onClick={openModal} block>
          추가
        </Button>
        <InfluencerDiscountSetModal
          {...{itemPk: index, isModalOpen, setIsModalOpen}}
          onComplete={() => setToRerender(toRerender + 1)}
        />
      </Wrapper>
    </Modal>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const GuideButton = styled(Button)`
  width: 18px;
  min-width: 18px;
  height: 18px;
  font-size: 10px;
`;
