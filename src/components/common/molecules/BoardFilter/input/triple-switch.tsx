import {Radio} from 'antd';

import {useBoardContext} from '@src/common/contexts/Board';

export type TripleSwitchProps = {
  name: string;
  trueText?: string;
  falseText?: string;
};

function TripleSwitch({name, trueText, falseText}: TripleSwitchProps) {
  const {
    state: {filter},
    action: {handleFilterChange},
  } = useBoardContext();

  const handleChange = (e) => {
    handleFilterChange({[name]: e.target.value});
  };

  return (
    <Radio.Group
      onChange={handleChange}
      value={filter[name] != null ? filter[name] : undefined}>
      <Radio.Button value={undefined}>전체</Radio.Button>
      <Radio.Button value={true}>{trueText ?? 'Y'}</Radio.Button>
      <Radio.Button value={false}>{falseText ?? 'N'}</Radio.Button>
    </Radio.Group>
  );
}

export default TripleSwitch;
