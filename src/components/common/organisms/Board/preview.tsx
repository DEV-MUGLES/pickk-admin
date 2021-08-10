import React from 'react';
import styled from 'styled-components';

import PreviewButton from '@src/components/common/molecules/button/preview';
import {WHITE} from '@src/common/constants/colors';

export type PreviewProps = {
  data: any;
  usePreviewData: any;
};

function Preview({data, usePreviewData}: PreviewProps) {
  const {data: previewValue} = usePreviewData([]);

  if (previewValue) {
    return (
      <PreviewWrapper>
        {Object.values(previewValue)
          .map((value, index) => (
            <PreviewButton
              key={data[index].label}
              {...data[index]}
              count={value}
            />
          ))
          .filter((_, i) => !data[i].disabled)}
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
`;
