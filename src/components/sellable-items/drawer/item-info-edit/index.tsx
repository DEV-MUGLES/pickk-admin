import {Collapse, Drawer, DrawerProps, Space} from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

import ItemBaseInfoEditSection from './base';

import {CollapseType} from '..';

export type ItemInfoEditDrawerProps = Pick<DrawerProps, 'visible' | 'onClose'>;

const MODAL_COLLAPSE: CollapseType[] = [
  {
    props: {
      defaultActiveKey: ['1'],
    },
    panels: [
      {
        props: {
          header: '상품 기본 정보 수정',
          key: '1',
        },
        Content: ItemBaseInfoEditSection,
      },
    ],
  },
  {
    panels: [
      {
        props: {
          header: '상세 이미지 수정',
          key: '1',
        },
        Content: () => <p>상세 이미지 수정</p>,
      },
    ],
  },
];

function ItemInfoEditDrawer({visible, onClose}: ItemInfoEditDrawerProps) {
  return (
    <Drawer title="정보 수정" visible={visible} onClose={onClose} width={'50%'}>
      <Space direction="vertical" style={{width: '100%'}} size="small">
        {MODAL_COLLAPSE.map(({props, panels}, index) => (
          <Collapse key={index} {...props}>
            {panels.map(({props: pprops, Content}, i) => (
              <CollapsePanel key={i} {...pprops}>
                <Content />
              </CollapsePanel>
            ))}
          </Collapse>
        ))}
      </Space>
    </Drawer>
  );
}

export default ItemInfoEditDrawer;
