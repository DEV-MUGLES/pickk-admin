import {Badge, Typography} from 'antd';

import {Items_items} from '@src/operations/__generated__/Items';

const {Text} = Typography;

export type SellableItemStockProps = Pick<
  Items_items,
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
  products: Items_items['products'],
  isInfiniteStock: Items_items['isInfiniteStock'],
  isSoldout: Items_items['isSoldout'],
) {
  if (isInfiniteStock) {
    return 'lime';
  }
  if (isSoldout) {
    return 'volcano';
  }

  const soldoutCount = products.filter(({stock}) => stock <= 0).length;
  if (soldoutCount >= 1) {
    return 'orange';
  }
  if (products.length - soldoutCount < 5) {
    return 'yellow';
  }
  return 'lime';
}
