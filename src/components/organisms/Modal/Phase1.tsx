import React, {useState} from 'react';
import {Typography, Input, Button, DatePicker, message} from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import Img from '@src/components/atoms/img';
import Space from '@src/components/atoms/space';
import {GREY} from '@src/components/atoms/colors';

import {User} from '@src/types/User';
import ItemService from '@src/lib/services/Item';

const {Text} = Typography;
const {RangePicker} = DatePicker;

export type Phase1Props = {
  itemPk: number;
  setPhase: React.Dispatch<React.SetStateAction<number>>;
  selectedInfluencerData: User;
  // tslint:disable-next-line: no-any
  handleDiscountDataChange: (data: any) => void;
  closeModal: () => void;
};

export default function Phase1({
  itemPk,
  setPhase,
  selectedInfluencerData,
  handleDiscountDataChange,
  closeModal,
}: Phase1Props) {
  const [body, setBody] = useState(
    {} as {discountRate: number; startAt: string; endAt: string},
  );

  const handleDiscountRateChange = (e) => {
    setBody({...body, discountRate: Number(e.target.value)});
  };

  const handleDiscountPeriodChange = (date: [moment.Moment, moment.Moment]) => {
    setBody({
      ...body,
      startAt: moment(date[0]).format(),
      endAt: moment(date[1]).format(),
    });
  };

  const handleSubmit = async () => {
    try {
      await ItemService.discountsCreate(itemPk, {
        userId: selectedInfluencerData.id,
        ...body,
      });
      message.success('추가 완료');
      closeModal();
      setPhase(0);
    } catch (err) {
      message.error(
        err.response.data?.errorMessage || err.response.data?.nonFieldErrors[0],
      );
    }
  };

  return (
    <Wrapper>
      {selectedInfluencerData && (
        <SearchResultRow>
          <Space direction="ROW" />
          <Img
            src={selectedInfluencerData.profileImageUrl}
            circle={true}
            width="35px"
            height="35px"
          />
          <Space direction="ROW" level={1} />
          <Name>{selectedInfluencerData.name}</Name>
          <Text>구독자 : {selectedInfluencerData.followersCount}명</Text>
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
  color: ${GREY[800]};
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
