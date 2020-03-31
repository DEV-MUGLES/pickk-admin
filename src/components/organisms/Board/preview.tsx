import React from 'react';
import styled from 'styled-components';

import PreviewButton from '@src/components/molecules/button/preview';
import Colors from '@src/components/atoms/colors';

export default function Preview({data, usePreviewData}) {
  const {data: previewValue} = usePreviewData([]);

  if (previewValue) {
    console.log(previewValue);
    return (
      <PreviewWrapper>
        {Object.values(previewValue)
          .filter((_, i) => !data[i].disabled)
          .map((value, index) => (
            <PreviewButton
              key={data[index].label}
              {...data[index]}
              count={value}
            />
          ))}
      </PreviewWrapper>
    );
  }
  return <></>;
}

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: fit-content;
  background-color: ${Colors.White};
  padding: 16px 6rem;
`;
