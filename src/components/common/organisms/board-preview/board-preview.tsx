import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {palette} from '@pickk/design-token';

import {getTimeString} from '@src/common/helpers';

import PreviewButton from './button';

import {BoardPreviewProps} from './board-preview.types';

const {Text} = Typography;

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${palette.white};
  margin-bottom: 1.2rem;
`;

const PreviewHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 1rem 24px 0.4rem 24px;
`;

const TitleText = styled(Text).attrs({
  strong: true,
})`
  margin-right: auto;
`;

const LastUpdateAtText = styled(Text).attrs({type: 'secondary'})`
  margin-right: 0.6rem;
`;

const StyledReloadOutlined = styled(ReloadOutlined)`
  color: ${palette.gray4};

  &:hover {
    cursor: pointer;
  }
`;

const PreviewBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  padding: 1.4rem 4rem;
`;

export default function BoardPreview({
  previews,
  usePreviewData,
  filter,
  onPreviewClick,
}: BoardPreviewProps) {
  const {data: previewData, reload = () => null} = usePreviewData();

  if (!previewData) {
    return <></>;
  }

  const clearFilter = () => {
    if (confirm('미니 대시보드 필터를 해제하시겠습니까?')) {
      onPreviewClick({});
    }
  };

  const renderPreviews = () => {
    return previews.map((preview) => {
      const isSelected = Object.keys(preview.filter).every(
        (key) => preview.filter[key] === filter[key],
      );

      return (
        <PreviewButton
          key={preview.label}
          {...preview}
          count={previewData[preview.name]}
          isSelected={isSelected}
          onClick={isSelected ? clearFilter : onPreviewClick}
        />
      );
    });
  };

  return (
    <StyledWrapper>
      <PreviewHeader>
        <TitleText>미니 대시보드</TitleText>
        <LastUpdateAtText>
          마지막 업데이트: {getTimeString(previewData.lastUpdatedAt)}
        </LastUpdateAtText>
        <StyledReloadOutlined onClick={reload} />
      </PreviewHeader>
      <PreviewBody>{renderPreviews()}</PreviewBody>
    </StyledWrapper>
  );
}
