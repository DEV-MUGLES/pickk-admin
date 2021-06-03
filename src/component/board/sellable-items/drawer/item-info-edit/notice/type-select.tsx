import {Select} from 'antd';

import {ItemNoticeType} from '@src/operations/__generated__/globalTypes';
import {CustomInputProps} from '@src/components/organisms/Form/base';

const {Option} = Select;

const ItemNoticeTypeAlias: Record<ItemNoticeType, string> = {
  General: '일반안내',
  DeliveryDelay: '배송지연',
  CustomOrder: '주문제작',
  OverseaDelivery: '해외배송',
  PreorderDelivery: '예약배송',
};

export type ItemNoticeTypeSelectProps = CustomInputProps<string>;

function ItemNoticeTypeSelect({value, onChange}: ItemNoticeTypeSelectProps) {
  return (
    <Select onChange={onChange} value={value}>
      {Object.keys(ItemNoticeType).map((key) => (
        <Option value={key} key={key}>
          {ItemNoticeTypeAlias[key]}
        </Option>
      ))}
    </Select>
  );
}

export default ItemNoticeTypeSelect;
