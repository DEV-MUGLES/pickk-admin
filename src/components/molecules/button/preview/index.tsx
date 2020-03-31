import React from 'react';
import styled from 'styled-components';
import {Typography, Icon} from 'antd';

import {useBoardContext} from '@src/contexts/Board';
import {Filter} from '@src/types';

import Space from '@src/components/atoms/space';
import Colors from '@src/components/atoms/colors';

const {Text} = Typography;

export type PreviewProps = {
  iconType: string;
  label: string;
  count: number;
  filterValue: Filter;
};

function PreviewButton({iconType, label, count, filterValue}: PreviewProps) {
  const {state, action} = useBoardContext();
  const {filter, defaultFilter} = state;
  const {applyPreview} = action;

  const newFilterValue = {...defaultFilter, ...filterValue};
  const isSelected = Object.keys(newFilterValue).every(
    key => newFilterValue[key] === filter[key],
  );

  const handleClick = () => {
    applyPreview(newFilterValue);
  };

  return (
    <Wrapper onClick={handleClick}>
      <IconBackground isSelected={isSelected}>
        <Icon
          type={iconType}
          style={{color: Colors.White, fontSize: '1.2rem'}}
          theme="outlined"
        />
      </IconBackground>
      <Space level={1} direction="ROW" />
      <DataWrapper>
        <StyledText isSelected={isSelected}>{label}</StyledText>
        <StyledText isSelected={isSelected}>
          <StyledText
            isSelected={isSelected}
            strong
            style={{fontSize: '1.2em'}}>
            {count}
          </StyledText>{' '}
          건
        </StyledText>
      </DataWrapper>
    </Wrapper>
  );
}

export default React.memo(PreviewButton);

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
`;

const IconBackground = styled.div<{isSelected: boolean}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3.2em;
  height: 3.2em;
  border-radius: 9999px;
  background-color: ${props => (props.isSelected ? Colors.Primary : 'grey')};
  transition: 0.2s;
  ${Wrapper}:hover & {
    background-color: ${Colors.Primary};
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  justify-content: space-around;
  align-items: flex-start;
`;

const StyledText = styled(Text)<{isSelected: boolean}>`
  ${props => props.isSelected && `color: ${Colors.Primary}`};
  transition: 0.2s;
  ${Wrapper}:hover & {
    color: ${Colors.Primary};
  }
`;
