import React from 'react';
import {Typography, Input, Button, DatePicker, message} from 'antd';
import styled from 'styled-components';

import Img from '@src/components/atoms/img';
import Space from '@src/components/atoms/space';
import Colors from '@src/components/atoms/colors';
import moment from 'moment';

const {Text} = Typography;
const {RangePicker} = DatePicker;

export default function Phase1({
  setPhase,
  setPhaseTitle,
  selectedInfluencerData,
  handleDiscountDataChange,
  closeModal,
}) {
  const handleDiscountRateChange = e => {
    handleDiscountDataChange({discountRate: e.target.value});
  };

  const handleDiscountPeriodChange = date => {
    handleDiscountDataChange({
      discountStartPeriod: moment(date[0]).format('YYYY-MM-DD'),
      discountEndPeriod: moment(date[1]).format('YYYY-MM-DD'),
    });
  };

  const handleSubmit = () => {
    message.success('추가 완료');
    closeModal();
    setPhaseTitle('인플루언서 찾기');
    setPhase(0);
  };

  return (
    <Wrapper>
      {selectedInfluencerData && (
        <SearchResultRow>
          <Space direction="ROW" />
          <Img
            src={selectedInfluencerData.avatar}
            circle={true}
            width="35px"
            height="35px"
          />
          <Space direction="ROW" level={1} />
          <Name>{selectedInfluencerData.name}</Name>
          <Text>구독자 : {selectedInfluencerData.subscriberNumber}명</Text>
          <Space direction="ROW" />
        </SearchResultRow>
      )}
      <Space level={4} />
      <DiscountFieldWrapper>
        <Text strong> 할인율</Text>
        <Row>
          <RateInput size="large" onChange={handleDiscountRateChange} />
          <Space direction="ROW" />
          <Text>%</Text>
        </Row>
        <Space level={1} />
        <Text strong>기간</Text>
        <Space level={1} />
        <Row>
          <DiscountPeriodPicker onChange={handleDiscountPeriodChange} />
        </Row>
      </DiscountFieldWrapper>
      <Space level={8} />
      <Button type="primary" onClick={handleSubmit}>
        완료
      </Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 350px;
`;

const SearchResultRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px;
  width: 100%;
`;

const Name = styled(Text)`
  margin-right: auto;
  color: ${Colors.Black};
`;

const DiscountFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
`;

const RateInput = styled(Input)`
  width: 42px;
`;

const DiscountPeriodPicker = styled(RangePicker)`
  width: 240px;
`;
