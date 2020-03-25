import React from 'react';
import {Typography} from 'antd';
import {usePlacementPreview} from '@src/hooks';
import {FilterWrapper} from '@src/components/organisms/Board/Filter';

const {Text} = Typography;

const LABEL_TEXTS = [
  '발송 전 취소 요청',
  '발송 전 배송지 변경',
  '신규 주문',
  '발주 확인 완료',
];

export default function PlacementPreview() {
  const {data: previewData} = usePlacementPreview([]);

  if (previewData) {
    return (
      <FilterWrapper>
        {Object.values(previewData).map((v, i) => (
          <div>
            <Text key={LABEL_TEXTS[i]}>{`${LABEL_TEXTS[i]} : ${v}`}</Text>
          </div>
        ))}
      </FilterWrapper>
    );
  }
  return <></>;
}
