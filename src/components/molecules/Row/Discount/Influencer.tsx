import React from 'react';
import {
  Input,
  Typography,
  DatePicker,
  Button,
  Popconfirm,
  Icon,
  message,
} from 'antd';
import styled from 'styled-components';

import {DiscountRowProps} from '@src/components/molecules/Row/Discount/Subscription';
import Space from '@src/components/atoms/space';
import moment from 'moment';

const {Text} = Typography;
const {RangePicker} = DatePicker;

export type InfluencerDiscountProps = {
  name: string;
} & DiscountRowProps;

export type InfluencerDiscountRowProps = {
  index: number;
  data: InfluencerDiscountProps;
  // tslint:disable-next-line: no-any
  setData: (data: InfluencerDiscountProps) => void;
  deleteData: () => void;
};

export default function InfluencerDiscountRow({
  index,
  data,
  setData,
  deleteData,
}: InfluencerDiscountRowProps) {
  const handleSubscribeDiscountRateChange = e => {
    setData({...data, ...{subscribeDiscountRate: e.target.value}});
  };

  const handleSubscribeDiscountPeriodChange = date => {
    const subscribeDiscountStartPeriod = moment(date[0]).format('YYYY-MM-DD');
    const subscribeDiscountEndPeriod = moment(date[1]).format('YYYY-MM-DD');
    setData({
      ...data,
      ...{subscribeDiscountStartPeriod, subscribeDiscountEndPeriod},
    });
  };

  const handleSubmit = () => {
    message.success('변경 완료');
  };

  return (
    <Wrapper>
      <Text>{index + 1}</Text>
      <Space direction="ROW" level={4} />
      <Name>{data.name}</Name>
      <DiscountRateInput
        size="small"
        value={data.subscribeDiscountRate}
        onChange={handleSubscribeDiscountRateChange}
      />
      <Space direction="ROW" />
      <Text>%</Text>
      <Space direction="ROW" level={4} />
      <DiscountPeriodPicker
        name="choicedSelectValue"
        size="small"
        value={[
          moment(data.subscribeDiscountStartPeriod),
          moment(data.subscribeDiscountEndPeriod),
        ]}
        onChange={handleSubscribeDiscountPeriodChange}
      />
      <Space direction="ROW" level={4} />
      <Popconfirm
        title="정말 변경하시겠습니까？"
        onConfirm={handleSubmit}
        okText="예"
        cancelText="아니오"
        icon={<Icon type="question-circle-o" />}>
        <Button size="small">변경</Button>
      </Popconfirm>
      <Space direction="ROW" />
      <Popconfirm
        title="정말 삭제하시겠습니까？"
        onConfirm={deleteData}
        okText="예"
        cancelText="아니오"
        icon={<Icon type="question-circle-o" style={{color: '#f33'}} />}>
        <DeleteButton size="small">삭제</DeleteButton>
      </Popconfirm>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 790px;
`;

const Name = styled(Text)`
  margin-right: auto;
`;

const DiscountRateInput = styled(Input)`
  width: 40px;
`;

const DiscountPeriodPicker = styled(RangePicker)`
  width: 400px;
`;

const DeleteButton = styled(Button)`
  color: #f33;
`;
