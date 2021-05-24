import {Select, SelectProps} from 'antd';

import {ItemNoticeType} from '@src/operations/__generated__/globalTypes';

const {Option} = Select;

const ItemNoticeTypeAlias: Record<ItemNoticeType, string> = {
  General: '일반안내',
  DeliveryDelay: '배송지연',
  CustomOrder: '주문제작',
  OverseaDelivery: '해외배송',
  PreorderDelivery: '예약배송',
};

export type ItemNoticeTypeSelectProps = Pick<
  SelectProps<any>,
  'onChange' | 'defaultValue' | 'value'
>;

function ItemNoticeTypeSelect({
  defaultValue,
  value,
  onChange = (value: string) => null,
}: ItemNoticeTypeSelectProps) {
  return (
    <Select defaultValue={defaultValue} onChange={onChange} value={value}>
      {Object.keys(ItemNoticeType).map((key) => (
        <Option value={key}>{ItemNoticeTypeAlias[key]}</Option>
      ))}
    </Select>
  );
}

export default ItemNoticeTypeSelect;
