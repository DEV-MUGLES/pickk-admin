import {Space, Table, Tag} from 'antd';

import PriceAddButton from './price-add/price-add-button';
import {renderBooleanColumn} from '@src/components/molecules/BoardFilter/render';

import {useBoardContext} from '@src/contexts/Board';
import {addCommaToNumber} from '@src/lib/NumberParser';

function ManagePriceSection() {
  const {
    state: {selectedData},
  } = useBoardContext();

  return (
    <>
      <PriceAddButton />
      <Table
        dataSource={selectedData?.prices}
        columns={[
          {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '설정 여부',
            dataIndex: 'isBase',
            key: 'isBase',
            width: 80,
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
            title: '연동가 설정',
            dataIndex: 'isCrawlUpdating',
            key: 'isCrawlUpdating',
            render: renderBooleanColumn,
          },
        ]}
        style={{marginTop: '0.8rem'}}
      />
    </>
  );
}

export default ManagePriceSection;
