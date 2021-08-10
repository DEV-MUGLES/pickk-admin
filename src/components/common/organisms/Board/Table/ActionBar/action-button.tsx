import React from 'react';
import {message, Button} from 'antd';

import {TableActionType} from '../table';
import {useBoardContext} from '@src/common/contexts/Board';

export type TableActionButtonProps = {
  selectedRowKeys: number[];
  tableAction?: TableActionType;
};

function TableActionButton({
  selectedRowKeys,
  tableAction,
}: TableActionButtonProps) {
  const {reload} = useBoardContext().action;
  const {icon, text, useTableAction = () => [], handleClick} = tableAction;
  const [mutate] = useTableAction();

  const handleActionButtonClick = async () => {
    try {
      await handleClick(selectedRowKeys, mutate);
      reload();
    } catch (err) {
      message.error('실패! - ' + err);
    }
  };

  return (
    <Button
      disabled={selectedRowKeys.length === 0}
      icon={icon}
      onClick={handleActionButtonClick}>
      {text}
    </Button>
  );
}

export default TableActionButton;
