import React, {useState} from 'react';
import {Typography, Button, Tooltip, message} from 'antd';
import styled from 'styled-components';

import InfluencerDiscountRow, {
  InfluencerDiscountProps,
} from '@src/components/molecules/Row/Discount/Influencer';
import Space from '@src/components/atoms/space';
import InfluencerDiscountSetModal from '@src/components/organisms/Modal';

const {Text} = Typography;

export type InfluencerDiscountSectionProps = {
  influencerDiscountData: InfluencerDiscountProps[];
};

export default function InfluencerDiscountSection({
  influencerDiscountData,
}: InfluencerDiscountSectionProps) {
  const [dataList, setDataList] = useState(influencerDiscountData);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRowChange = index => data => {
    setDataList([
      ...dataList.slice(0, index),
      data,
      ...dataList.slice(index + 1, dataList.length),
    ]);
  };

  const handleRowDelete = index => () => {
    setDataList([
      ...dataList.slice(0, index),
      ...dataList.slice(index + 1, dataList.length),
    ]);
    message.success('삭제 완료');
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <Wrapper>
      <TitleRow>
        <Text strong>인플루언서별 할인율</Text>
        <Space direction="ROW" />
        <Tooltip placement="right" title="인플루언서별 할인율 설명입니다">
          <GuideButton shape="circle" icon="question" />
        </Tooltip>
      </TitleRow>
      <Space level={1} />
      {dataList.map((item, index) => (
        <>
          <InfluencerDiscountRow
            {...{index}}
            data={item}
            setData={handleRowChange(index)}
            deleteData={handleRowDelete(index)}
          />
          <Space />
        </>
      ))}
      <Space />
      <Button type="primary" size="small" onClick={openModal} block>
        추가
      </Button>
      <InfluencerDiscountSetModal {...{isModalOpen, setIsModalOpen}} />
    </Wrapper>
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
