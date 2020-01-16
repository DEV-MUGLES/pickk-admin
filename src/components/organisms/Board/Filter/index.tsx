import React, { useState } from 'react';
import {Layout} from 'antd';
import styled from 'styled-components';
import moment from 'moment';

import Colors from '@src/components/atoms/colors';
import Header from '@src/components/organisms/Board/Filter/Header';
import Body from '@src/components/organisms/Board/Filter/Body';
import ButtonArea from '@src/components/organisms/Board/Filter/ButtonArea';
import DatePicker from '@src/components/molecules/BoardFilter/input/DatePicker';

const {Content} = Layout;

export default function BoardFilter(
) {
  const [filterState, setFilterState] = useState({});

  const [choicedSelectValue, setChoicedSelectValue] = useState('registerProductDate');
  const [choicedStartDate, setChoicedStartDate] = useState(moment());
  const [choicedEndDate, setChoicedEndDate] = useState(moment());

  const bodyprops = [{labelText: '상세조건', guideText: '상세조건 부가 설명입니다.', Component: DatePicker,
    select: [{name: '상품등록일', value: 'registerProductDate'},
    {name: '판매시작일', value: 'startSellingDate'},
    {name: '판매종료일', value: 'endSellingDate'}],
    quickButton: true,
    choicedSelectValue,
    setChoicedSelectValue,
    choicedStartDate,
    choicedEndDate,
    setChoicedStartDate,
    setChoicedEndDate,
  }];

  const handleSubmit = () => {
    console.log(choicedSelectValue);
    console.log(choicedStartDate);
    console.log(choicedEndDate);
  };

  const handleReset = () => {
    setChoicedSelectValue('registerProductDate');
    setChoicedStartDate(moment());
    setChoicedEndDate(moment());
    console.log('reset');
  };

  return(
      <StyledLayout>
          <StyledContent>
            <Header title={"조회하기"} guideText={"이것은 조회하기의 임시 텍스트입니다."}/>
            <Body inputs={bodyprops}></Body>
            <ButtonArea handleSubmit={handleSubmit} handleReset={handleReset}></ButtonArea>
          </StyledContent>
      </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
    display:flex;
    flex-direction:column;
    background-color:${Colors.White};
    padding: 16px 24px;
`;

const StyledContent = styled(Content)`
    display:flex;
    flex-direction:column;
    align-items:center;
`;
