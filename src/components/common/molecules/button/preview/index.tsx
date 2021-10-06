import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';
import {palette} from '@pickk/design-token';

import {useBoardContext} from '@src/common/contexts/Board';
import {PreviewDataType} from '@src/components/common/organisms/Board/preview';

const {Text} = Typography;

export type PreviewProps = Pick<
  PreviewDataType,
  'label' | 'icon' | 'filterValue'
> & {count: number};

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
        <Icon style={{color: palette.white, fontSize: '1.2rem'}} />
      </IconBackground>
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
    props.isSelected ? palette.gray6 : palette.gray4};
  transition: 0.2s;
  ${Wrapper}:hover & {
    background-color: ${palette.gray6};
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: fit-content;
  height: 100%;
  justify-content: space-around;
  align-items: flex-start;
  margin-left: 1.2rem;
`;

const StyledText = styled(Text)<{isSelected: boolean}>`
  ${(props) => props.isSelected && `color: ${palette.gray6}`};
  transition: 0.2s;
  ${Wrapper}:hover & {
    color: ${palette.gray6};
  }
`;
