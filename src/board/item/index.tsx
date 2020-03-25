import Filter from '@src/components/organisms/Board/Filter';
import Table from '@src/components/organisms/Board/Table';
import Space from '@src/components/atoms/space';

import {withBoardContext} from '@src/contexts/Board';
import {useItemTable} from '@src/hooks/table/Item';

import {itemInputs} from './inputs';
import {itemColumns} from './table/columns';
import {BoardProps} from '../props';

function ItemBoard({title}: BoardProps) {
  return (
    <>
      <Filter title={title} inputs={itemInputs} />
      <Space level={2} />
      <Table title={title} columns={itemColumns} />
      <Space level={2} />
    </>
  );
}

export default withBoardContext(ItemBoard, {name: ''}, useItemTable);
