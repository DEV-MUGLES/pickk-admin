import {Space, Tag} from 'antd';
import dayjs from 'dayjs';

import {renderBooleanColumn} from '@src/components/molecules/BoardFilter/render';
import {addCommaToNumber} from '@src/lib/NumberParser';

export const itemPricesColumns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '설정 여부',
    dataIndex: 'isBase',
    key: 'isBase',
    width: 100,
    render: (_, {isBase, isActive}) => (
      <Space direction="vertical">
        {isBase == true && <Tag color="blue">기본가격</Tag>}
        {isActive == true && <Tag color="volcano">활성가격</Tag>}
      </Space>
    ),
  },
  {
    title: '정가',
    dataIndex: 'originalPrice',
    key: 'originalPrice',
    render: (value) => `${addCommaToNumber(value)} 원`,
  },
  {
    title: '공급가',
    dataIndex: 'sellPrice',
    key: 'sellPrice',
    render: (value) => `${addCommaToNumber(value)} 원`,
  },
  {
    title: '판매가',
    dataIndex: 'finalPrice',
    key: 'finalPrice',
    render: (value) => `${addCommaToNumber(value)} 원`,
  },
  {
    title: '연동가 설정 여부',
    dataIndex: 'isCrawlUpdating',
    key: 'isCrawlUpdating',
    width: 80,
    render: renderBooleanColumn,
  },
  {
    title: '기간',
    dataIndex: 'range',
    key: 'range',
    render: (_, {startAt, endAt}) =>
      `${startAt ? dayjs(startAt).format('YYYY/MM/DD') : ''} ~ ${
        endAt ? dayjs(endAt).format('YYYY/MM/DD') : ''
      }`,
  },
];
