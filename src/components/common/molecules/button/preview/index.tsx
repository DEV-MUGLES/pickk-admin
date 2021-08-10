import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';

import {useBoardContext} from '@src/common/contexts/Board';
import {Filter} from '@src/types';

import Space from '@src/components/common/atoms/space';
import {WHITE, INDIGO_BLUE} from '@src/components/common/atoms/colors';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';

const {Text} = Typography;

export type PreviewProps = {
  icon: React.FunctionComponent<AntdIconProps>;
  label: string;
  count: number;
  filterValue: Filter;
};

function PreviewButton({icon: Icon, label, count, filterValue}: PreviewProps) {
  const {state, action} = useBoardContext();
  const {filter, defaultFilter} = state;
  const {applyPreview} = action;

  const newFilterValue = {...defaultFilter, ...filterValue};
  const isSelected = Object.keys(newFilterValue).every(
    (key) => newFilterValue[key] === filter[key],
  );

  const handleClick = () => {
    applyPreview(newFilterValue);
  };

  return (
    <Wrapper onClick={handleClick}>
      <IconBackground isSelected={isSelected}>
        <Icon style={{color: WHITE, fontSize: '1.2rem'}} />
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
  background-color: ${(props) =>
    props.isSelected ? INDIGO_BLUE[900] : 'grey'};
  transition: 0.2s;
  ${Wrapper}:hover & {
    background-color: ${INDIGO_BLUE[900]};
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
  ${(props) => props.isSelected && `color: ${INDIGO_BLUE[900]}`};
  transition: 0.2s;
  ${Wrapper}:hover & {
    color: ${INDIGO_BLUE[900]};
  }
`;
