import styled from 'styled-components';
import {Space, Card, Spin, Typography} from 'antd';
import {Item} from '@pickk/common';

import {useBoardContext} from '@src/common/contexts/Board';
import {addCommaToNumber} from '@src/common/helpers/NumberParser';

const {Text} = Typography;

function CurrentPriceInfoSection() {
  const {
    state: {selectedData},
  } = useBoardContext();
  const selectedItem: Item = selectedData;

  if (!selectedData) {
    return <Spin />;
  }

  // 활성화 된 가격이 없는 경우 연동된 가격을 기본값으로 사용
  const activePrice =
    selectedItem.prices.find(({isActive}) => isActive) ||
    selectedItem.prices.find(({isBase}) => isBase);
  const {
    originalPrice = 0,
    sellPrice = 0,
    finalPrice = 0,
    isBase,
  } = activePrice;
  const priceInfoMessage = isBase
    ? '공식 홈페이지와 가격을 연동 중입니다. ✅'
    : '어드민에서 직접 입력한 가격이 적용 중입니다. 👷‍♂️';

  return (
    <>
      <Card style={{flex: 1}}>
        <Space direction="vertical">
          <Text>
            <Label strong>정가 : </Label>
            {addCommaToNumber(originalPrice)} 원
          </Text>
          <Text>
            <Label strong>판매가 : </Label>
            {addCommaToNumber(sellPrice)} 원
          </Text>
          <Text>
            <Label strong>쿠폰적용가 : </Label>
            {addCommaToNumber(finalPrice)} 원
          </Text>
        </Space>
      </Card>
      <Message>* {priceInfoMessage}</Message>
    </>
  );
}

export default CurrentPriceInfoSection;

const Label = styled(Text)`
  display: inline-block;
  width: 8rem;
`;

const Message = styled(Text).attrs({strong: true})`
  display: block;
  margin: 0.4rem;
  margin-top: 0.6rem;
`;
