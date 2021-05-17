import {Items_items_products} from '@pickk/common/dist/__generated__/Items';
import {FIRE_RED} from '@src/components/atoms/colors';

export type SellableItemStockProps = {
  products: Items_items_products[];
  isInfiniteStock: boolean;
  isSoldout: boolean;
};

function SellableItemStock({
  products,
  isInfiniteStock,
  isSoldout,
}: SellableItemStockProps) {
  const allStocks = products.reduce((acc, {stock}) => (acc += stock), 0);
  const backgroundColor = getColor(products, isInfiniteStock, isSoldout);

  return <p style={{backgroundColor, margin: 0}}>{allStocks}</p>;
}

export default SellableItemStock;

function getColor(
  products: Items_items_products[],
  isInfiniteStock: boolean,
  isSoldout: boolean,
) {
  if (isInfiniteStock) {
    return '';
  }
  if (isSoldout) {
    return FIRE_RED[500];
  }

  const soldoutProducts = products.filter(({stock}) => stock <= 0);
  if (soldoutProducts.length >= 1) {
    return 'orange';
  }
  if (products.length - soldoutProducts.length < 5) {
    return 'yellow';
  }
  return 'white';
}
