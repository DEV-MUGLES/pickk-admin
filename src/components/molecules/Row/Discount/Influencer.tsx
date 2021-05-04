import React, {useState} from 'react';
import {Input, Typography, DatePicker, Button, Popconfirm, message} from 'antd';
import styled from 'styled-components';

import {DiscountRowProps} from '@src/components/molecules/Row/Discount/Subscription';
import Space from '@src/components/atoms/space';
import moment from 'moment';
import {ItemDiscount} from '@src/types';
import ItemService from '@src/lib/services/Item';
import {QuestionCircleOutlined} from '@ant-design/icons';

const {Text} = Typography;
const {RangePicker} = DatePicker;

export type InfluencerDiscountProps = {
  name: string;
} & DiscountRowProps;

export type InfluencerDiscountRowProps = {
  index: number;
  data: ItemDiscount;
  onChange: () => void;
  // tslint:disable-next-line: no-any
};

export default function InfluencerDiscountRow(
  props: InfluencerDiscountRowProps,
) {
  const {index, onChange} = props;
  const [data, setData] = useState(props.data);
  const handleDiscountRateChange = (e) => {
    setData({...data, ...{discountRate: e.target.value}});
  };

  const handleSubscribeDiscountPeriodChange = (date) => {
    const startAt = moment(date[0]).format();
    const endAt = moment(date[1]).format();
    setData({
      ...data,
      ...{startAt, endAt},
    });
  };

  const handleSubmit = async () => {
    try {
      await ItemService.discountsPartialUpdate(data.item, data.id, {
        discountRate: data.discountRate,
        startAt: data.startAt,
        endAt: data.endAt,
      });
      onChange();
      message.success('변경 완료');
    } catch (err) {
      message.error(
        '문제가 발생했습니다 - ' +
          (err.response.data?.errorMessage ||
            err.response.data?.nonFieldErrors[0]),
      );
    }
  };

  const handleDelete = async () => {
    try {
      await ItemService.discountsDelete(data.item, data.id);
      onChange();
      message.success('삭제 완료');
    } catch (err) {
      message.error(
        '문제가 발생했습니다 - ' +
          (err.response.data?.errorMessage ||
            err.response.data?.nonFieldErrors[0]),
      );
    }
  };

  return (
    <Wrapper>
      <Text>{index + 1}</Text>
      <Space direction="ROW" level={4} />
      <Name>{data.user.name}</Name>
      <DiscountRateInput
        size="small"
        value={data.discountRate}
        onChange={handleDiscountRateChange}
      />
      <Space direction="ROW" />
      <Text>%</Text>
      <Space direction="ROW" level={4} />
      <DiscountPeriodPicker
        name="choicedSelectValue"
        size="small"
        value={[moment(data.startAt), moment(data.endAt)]}
        onChange={handleSubscribeDiscountPeriodChange}
      />
      <Space direction="ROW" level={4} />
      <Popconfirm
        title="정말 변경하시겠습니까？"
        onConfirm={handleSubmit}
        okText="예"
        cancelText="아니오"
        icon={<QuestionCircleOutlined />}>
        <Button size="small">변경</Button>
      </Popconfirm>
      <Space direction="ROW" />
      <Popconfirm
        title="정말 삭제하시겠습니까？"
        onConfirm={handleDelete}
        okText="예"
        cancelText="아니오"
        icon={<QuestionCircleOutlined style={{color: '#f33'}} />}>
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
