import {useBoardContext} from '@src/contexts/Board';
import {Table} from 'antd';

import {Items_items} from '@src/operations/__generated__/Items';

import {stockColumns} from './columns';

function StockManageSection() {
  const {
    state: {selectedData},
  } = useBoardContext();
  const products: Items_items['products'] = selectedData.products;

  return <Table columns={stockColumns} dataSource={products} />;
}

export default StockManageSection;
