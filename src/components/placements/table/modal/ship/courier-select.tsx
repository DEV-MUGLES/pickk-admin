import {Select} from 'antd';

import {useCouriers} from './hooks';

const {Option} = Select;

export type CourierSelectProps = {
  value: number;
  onChange: (value: number) => void;
};

export default function CourierSelect(props: CourierSelectProps) {
  const {data = []} = useCouriers();

  const rendernOptions = () => {
    return [{id: undefined, name: '-----'}].concat(data).map(({id, name}) => (
      <Option key={id} value={id}>
        {name}
      </Option>
    ));
  };

  return (
    <Select {...props} style={{width: '8rem'}}>
      {rendernOptions()}
    </Select>
  );
}
