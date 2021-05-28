import {Collapse, Drawer, DrawerProps, Space} from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

import OptionManageSection from './sections/option';
import StockManageSection from './sections/stock-manage';

import {CollapseType} from '..';

const MODAL_COLLAPSE: CollapseType[] = [
  {
    props: {
      defaultActiveKey: ['1'],
    },
    panels: [
      {
        props: {
          header: '옵션 관리',
          key: '1',
        },
        Content: OptionManageSection,
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
          header: '재고 관리',
          key: '1',
        },
        Content: StockManageSection,
      },
    ],
  },
];

export type ItemOptionStockEditDrawerProps = Pick<
  DrawerProps,
  'visible' | 'onClose'
>;

function ItemOptionStockEditDrawer({
  visible,
  onClose,
}: ItemOptionStockEditDrawerProps) {
  return (
    <Drawer
      title="옵션/재고 관리"
      visible={visible}
      onClose={onClose}
      width={'50%'}>
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

export default ItemOptionStockEditDrawer;
