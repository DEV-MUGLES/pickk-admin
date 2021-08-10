import {Badge, Typography} from 'antd';
import {Item} from '@pickk/common';

const {Text} = Typography;

export type SellableItemStockProps = Pick<
  Item,
  'products' | 'isInfiniteStock' | 'isSoldout'
>;

function SellableItemStock({
  products,
  isInfiniteStock,
  isSoldout,
}: SellableItemStockProps) {
  const allStocks = products.reduce((acc, {stock}) => (acc += stock), 0);
  const badgeColor = getColor(products, isInfiniteStock, isSoldout);

  return (
    <Badge color={badgeColor} offset={[6, 0]}>
      <Text>{allStocks}</Text>
    </Badge>
  );
}

export default SellableItemStock;

function getColor(
  products: Item['products'],
  isInfiniteStock: Item['isInfiniteStock'],
  isSoldout: Item['isSoldout'],
) {
  if (isInfiniteStock) {
    return 'lime';
  }
  const soldoutCount = products.filter(({stock}) => stock <= 0).length;
  if (isSoldout || soldoutCount === products.length) {
    return 'volcano';
  }

  if (soldoutCount >= 1) {
    return 'orange';
  }

  const lackProductCount = products.filter(({stock}) => stock < 5).length;
  if (lackProductCount >= 1) {
    return 'yellow';
  }
  return 'lime';
}
