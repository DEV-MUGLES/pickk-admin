import React, {useState} from 'react';
import styled from 'styled-components';

import {usePlacementPreview} from '@src/hooks';

import Preview from '@src/components/molecules/button/preview';
import Colors from '@src/components/atoms/colors';

const LABEL_TEXTS = [
  {label: '발송 전 취소 요청', iconType: 'close', filter: {name: 'cancel'}},
  {
    label: '발송 전 배송지 변경',
    iconType: 'environment',
    filter: {name: 'exchange'},
  },
  {label: '신규 주문', iconType: 'shopping', filter: {name: 'newOrder'}},
  {label: '발주 확인 완료', iconType: 'check', filter: {name: 'confirmed'}},
];

export default function PlacementPreview() {
  const {data: previewData} = usePlacementPreview([]);
  const [selectedPreview, setSelectedPreview] = useState(null);

  if (previewData) {
    return (
      <PreviewWrapper>
        {Object.values(previewData).map((value, index) => (
          <Preview
            key={LABEL_TEXTS[index].label}
            {...LABEL_TEXTS[index]}
            count={value}
            {...{index, selectedPreview, setSelectedPreview}}
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
