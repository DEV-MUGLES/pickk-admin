import {Button} from 'antd';
import {palette} from '@pickk/design-token';

import {useBoardContext} from '@src/common/contexts/Board';
import {ReloadOutlined} from '@ant-design/icons';

export default function TableReloadButton() {
  const {state, action} = useBoardContext();
  const {loading} = state;
  const {reload} = action;

  return (
    <Button
      icon={<ReloadOutlined />}
      style={{color: palette.gray5, borderColor: palette.gray5}}
      loading={loading}
      onClick={reload}>
      새로 고침
    </Button>
  );
}
