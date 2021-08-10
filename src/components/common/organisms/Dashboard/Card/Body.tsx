import React from 'react';
import {Typography} from 'antd';
import styled from 'styled-components';
import Space from '@src/components/common/atoms/space';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';

const {Text} = Typography;

export type DashboardCardBodyProps = {
  Icon: React.FunctionComponent<AntdIconProps>;
  data: Array<{
    label: string;
    field: string;
  }>;
};

export default function DashboardCardBody({
  Icon,
  data,
}: DashboardCardBodyProps) {
  const fieldValues = {
    waitPayment: 10,
    newOrder: 0,
    goToday: 7,
    reservePurchase: 132,
    prepareShipping: 0,
    nowShipping: 0,
    doneShipping: 0,
    cancelRequest: 0,
    returnRequest: 0,
    exchangeRequest: 0,
  };

  return (
    <Wrapper>
      <Icon style={{fontSize: '40px', width: 'fit-content'}} />
      <InfoWrapper>
        {data.map((item) => (
          <InfoRow>
            <Text>{item.label}</Text>
            <FieldValueWrapper>
              <FieldValue strong>{fieldValues[item.field]}</FieldValue>
              <Space direction="ROW" />
              <Text>건</Text>
            </FieldValueWrapper>
          </InfoRow>
        ))}
      </InfoWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  height: fit-content;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 15px;
  padding-right: 5px;
  font-size: 14px;
`;

const InfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FieldValueWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
`;

const FieldValue = styled(Text)`
  font-size: 17px;
  margin-bottom: 2px;
`;
