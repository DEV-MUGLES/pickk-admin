import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';
import {palette} from '@pickk/design-token';

import {PreviewType} from './board-preview.types';

const {Text} = Typography;

const StyledWrapper = styled.div`
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

  ${StyledWrapper}:hover & {
    background-color: ${palette.gray6};
  }
`;

const DataWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  width: fit-content;
  height: 100%;
  margin-left: 1.2rem;
`;

const StyledText = styled(Text)<{isSelected: boolean}>`
  ${(props) => props.isSelected && `color: ${palette.gray6}`};
  transition: 0.2s;
  ${StyledWrapper}:hover & {
    color: ${palette.gray6};
  }
`;

export type BoardPreviewButtonProps = Pick<
  PreviewType,
  'Icon' | 'label' | 'filter'
> & {
  count: number;
  isSelected: boolean;
  onClick: (filter: PreviewType['filter']) => void;
};

export default function BoardPreviewButton({
  Icon,
  label,
  count,
  filter,
  isSelected,
  onClick = () => null,
}: BoardPreviewButtonProps) {
  const handleClick = () => {
    onClick(filter);
  };

  return (
    <StyledWrapper onClick={handleClick}>
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
            {count ?? '-'}
          </StyledText>{' '}
          건
        </StyledText>
      </DataWrapper>
    </StyledWrapper>
  );
}
