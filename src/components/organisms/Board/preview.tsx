import React from 'react';
import styled from 'styled-components';

import PreviewButton from '@src/components/molecules/button/preview';
import Colors from '@src/components/atoms/colors';

function Preview({data, usePreviewData}) {
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
  background-color: ${Colors.White};
  padding: 16px 6rem;
`;
