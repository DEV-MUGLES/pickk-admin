import {Collapse, CollapseProps, Drawer, DrawerProps, Space} from 'antd';
import CollapsePanel, {
  CollapsePanelProps,
} from 'antd/lib/collapse/CollapsePanel';

import ItemBaseInfoEditSection from './base';
import ItemNoticeEditSection from './notice';

export type ItemInfoEditModalProps = Pick<DrawerProps, 'visible' | 'onClose'>;

type CollapseType = {
  props?: CollapseProps;
  panels: {
    props: CollapsePanelProps;
    Content: React.ElementType;
  }[];
};

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
    props: {
      defaultActiveKey: ['1'],
    },
    panels: [
      {
        props: {
          header: '상품 안내메세지 수정',
          key: '1',
        },
        Content: ItemNoticeEditSection,
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

function ItemInfoEditDrawer({visible, onClose}: ItemInfoEditModalProps) {
  return (
    <Drawer title="정보 수정" visible={visible} onClose={onClose} width={'50%'}>
      <Space direction="vertical" style={{width: '100%'}} size="small">
        {MODAL_COLLAPSE.map(({props, panels}) => (
          <Collapse {...props}>
            {panels.map(({props: pprops, Content}) => (
              <CollapsePanel {...pprops}>
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
