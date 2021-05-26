import styled from 'styled-components';
import {Typography} from 'antd';

import {useBoardContext} from '@src/contexts/Board';
import {addCommaToNumber} from '@src/lib/NumberParser';
import {Items_items} from '@src/operations/__generated__/Items';

const {Text} = Typography;

function CurrentPriceInfoSection() {
  const {
    state: {selectedData},
  } = useBoardContext();
  const selectedItem: Items_items = selectedData;

  if (!selectedData) {
    return null;
  }

  const {originalPrice, sellPrice, finalPrice} = selectedItem;

  return (
    <Wrapper>
      <Text>정가: {addCommaToNumber(originalPrice)} 원</Text>
      <Text>공급가: {addCommaToNumber(sellPrice)} 원</Text>
      <Text>판매가: {addCommaToNumber(finalPrice)} 원</Text>
    </Wrapper>
  );
}

export default CurrentPriceInfoSection;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
