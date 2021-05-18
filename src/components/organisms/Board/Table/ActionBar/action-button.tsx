import React from 'react';
import {message, Button} from 'antd';

import {TableActionType} from '../table';
import {useBoardContext} from '@src/contexts/Board';

export type ActionButtonProps = {
  selectedRowKeys: number[];
  action?: TableActionType;
};

function ActionButton({selectedRowKeys, action}: ActionButtonProps) {
  const {reload} = useBoardContext().action;
  const {hook = () => [null, null]} = action;
  const [mutate] = hook();

  return (
    <Button
      disabled={selectedRowKeys.length === 0}
      icon={action.icon}
      onClick={async () => {
        try {
          const result = await action.onClick(selectedRowKeys, mutate);
          if (result) {
            reload();
          }
        } catch (err) {
          message.error('실패! - ' + err);
        }
      }}>
      {action.text}
    </Button>
  );
}

export default ActionButton;