import React from 'react';
import styled from 'styled-components';
import {AntdIconProps} from '@ant-design/icons/lib/components/AntdIcon';

import PreviewButton from '@src/components/common/molecules/button/preview';
import {WHITE} from '@src/common/constants/colors';

import {Filter} from '@src/common/contexts/Board/types';

export type PreviewDataType = {
  label: string;
  name?: string; // @TODO : 모두 새로운 프리뷰 적용 후 not optional로 변경
  icon: React.FunctionComponent<AntdIconProps>;
  filterValue: Filter;
  disabled?: boolean;
};

export type PreviewProps = {
  data: PreviewDataType[];
  usePreviewData: any;
};

function Preview({data, usePreviewData}: PreviewProps) {
  const {data: previewCounts} = usePreviewData([]);

  if (previewCounts) {
    return (
      <PreviewWrapper>
        {data
          .filter((value) => !value.disabled)
          .map((value) => (
            <PreviewButton
              key={value.label}
              {...value}
              count={previewCounts[value.name]}
            />
          ))}
      </PreviewWrapper>
    );
  }
  return <></>;
}

export default React.memo(Preview);

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  background-color: ${WHITE};
  padding: 16px 6rem;
  margin-bottom: 1.4rem;
`;
