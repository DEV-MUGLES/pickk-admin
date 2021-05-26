import {Space, Tag} from 'antd';

import PriceDisplayCard from './price-display-card';
import InfoTooltip from '@src/components/atoms/info-tooltip';

import {useBoardContext} from '@src/contexts/Board';
import {Items_items} from '@src/operations/__generated__/Items';

function CurrentPriceInfoSection() {
  const {
    state: {selectedData},
  } = useBoardContext();
  const selectedItem: Items_items = selectedData;

  if (!selectedData) {
    return null;
  }

  const basePrice = selectedItem.prices.find(({isBase}) => isBase);

  return (
    <Space size="middle">
      <PriceDisplayCard
        {...selectedItem}
        title={<Tag color="volcano">활성 가격</Tag>}
      />
      <PriceDisplayCard
        {...basePrice}
        title={
          <>
            <Tag color="blue">기본 가격</Tag>
            <InfoTooltip
              placement="right"
              title="활성가격의 기간 만료 시 기본가격으로 가격이 변경됩니다."
            />
          </>
        }
      />
    </Space>
  );
}

export default CurrentPriceInfoSection;
