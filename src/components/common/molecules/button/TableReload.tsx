import {Button} from 'antd';

import {INDIGO_BLUE} from '@src/common/constants/colors';
import {useBoardContext} from '@src/common/contexts/Board';
import {ReloadOutlined} from '@ant-design/icons';

export default function TableReloadButton() {
  const {state, action} = useBoardContext();
  const {loading} = state;
  const {reload} = action;

  return (
    <Button
      icon={<ReloadOutlined />}
      style={{color: INDIGO_BLUE[900], borderColor: INDIGO_BLUE[900]}}
      loading={loading}
      onClick={reload}>
      새로 고침
    </Button>
  );
}
