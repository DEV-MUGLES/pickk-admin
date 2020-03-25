import {Button} from 'antd';

import Colors from '@src/components/atoms/colors';
import {useBoardContext} from '@src/contexts/Board';

export default function TableReloadButton() {
  const {state, action} = useBoardContext();
  const {loading} = state;
  const {reload} = action;

  return (
    <Button
      icon="reload"
      style={{color: Colors.Primary, borderColor: Colors.Primary}}
      loading={loading}
      onClick={reload}>
      새로 고침
    </Button>
  );
}
