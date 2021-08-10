import {Tag} from 'antd';
import {ColumnsType} from 'antd/lib/table';
import {ItemPrice} from '@pickk/common';

import {addCommaToNumber} from '@src/common/helpers/NumberParser';
import {getTimeString} from '@src/common/helpers/date';

export const itemPricesColumns: ColumnsType<ItemPrice> = [
  {
    title: '설정 여부',
    dataIndex: 'isBase',
    key: 'isBase',
    render: (_, {isActive}) => isActive && <Tag color="volcano">적용중</Tag>,
  },
  {
    title: '기간',
    dataIndex: 'range',
    key: 'range',
    render: (_, {startAt, endAt}) =>
      `${startAt ? getTimeString(startAt) : ''} ~ ${
        endAt ? getTimeString(endAt) : ''
      }`,
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: (value) => `${addCommaToNumber(value)} 원`,
  },
  {
    title: '판매가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: (value) => `${addCommaToNumber(value)} 원`,
  },
];
