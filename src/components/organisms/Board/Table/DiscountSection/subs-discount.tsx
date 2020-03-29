import React, {useState, useReducer} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {Button, InputNumber, Typography, message} from 'antd';

import ItemService from '@src/lib/services/Item';
import {useDiscountList} from '@src/hooks/table';
import {ItemSubsDiscountRateInfo} from '@src/types';

import DateTimePicker from '@src/components/molecules/picker/date-time';

const {Text} = Typography;
const curTime = moment().format('YYYY-MM-DDTHH:mm:ss');

export const initialDiscountState: ItemSubsDiscountRateInfo = {
  discountRate: 0,
  startAt: curTime,
  endAt: curTime,
};

const discountReducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {...(action as ItemSubsDiscountRateInfo)};
    case 'update':
      return {...state, ...(action as ItemSubsDiscountRateInfo)};
    default:
      return state;
  }
};

export default function SubsDiscount({id, name, skuPrefix}) {
  const [discountInfo, dispatchDiscountInfo] = useReducer(
    discountReducer,
    initialDiscountState,
  );
  const [init, setInit] = useState(false);

  const handleDateTime = (type: 'start' | 'end', data: string) => {
    const newAt = data.replace(' ', 'T') + '+09:00';

    if (type === 'start') {
      dispatchDiscountInfo({
        type: 'update',
        startAt: newAt,
      });
    } else {
      dispatchDiscountInfo({
        type: 'update',
        endAt: newAt,
      });
    }
  };

  const handleApplyDiscountInfo = async () => {
    if (init) {
      await ItemService.updateItemDiscountRate(
        id,
        discountInfo.id,
        discountInfo,
      );
    } else {
      await ItemService.createItemDiscountRate(id, discountInfo);
    }
    message.success('할인율이 업데이트 되었습니다.');
  };

  const {loading, error, data} = useDiscountList([id]);
  if (data) {
    const numOfDiscount = data.length;
    if (numOfDiscount > 0 && !init) {
      dispatchDiscountInfo({type: 'init', ...data[numOfDiscount - 1]});
      setInit(true);
    }

    return (
      <React.Fragment>
        <Row>
          <Name>{name}</Name>
          <InnerRow>
            <Sku>{skuPrefix}</Sku>
            <Data>
              <InputNumber
                min={0}
                max={100}
                style={{width: '50px'}}
                value={discountInfo.discountRate}
                onChange={value => {
                  dispatchDiscountInfo({type: 'update', discountRate: value});
                }}
              />
            </Data>
            <DateTimePicker
              type="start"
              dateTime={discountInfo}
              onChange={handleDateTime}
            />
            <DateTimePicker
              type="end"
              dateTime={discountInfo}
              onChange={handleDateTime}
            />
            <Data>
              <Button onClick={handleApplyDiscountInfo}>확인</Button>
            </Data>
          </InnerRow>
        </Row>
      </React.Fragment>
    );
  }
  return <></>;
}

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 8px;
`;

const InnerRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`;

const Name = styled(Text).attrs({
  ellipsis: true,
})`
  width: 250px;
`;

const Sku = styled(Text)`
  width: 100px;
  text-align: center;
`;

const Data = styled.div`
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
