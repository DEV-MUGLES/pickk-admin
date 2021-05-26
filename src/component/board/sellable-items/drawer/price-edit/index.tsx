import React from 'react';
import {Collapse, Drawer, DrawerProps, Space} from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';

import CurrentPriceInfoSection from './sections/current-price';
import ManagePriceSection from './sections/manage-price';

import {CollapseType} from '..';

export type ItemPriceEditDrawerProps = Pick<DrawerProps, 'visible' | 'onClose'>;

const MODAL_COLLAPSE: CollapseType[] = [
  {
    props: {
      defaultActiveKey: ['1'],
    },
    panels: [
      {
        props: {
          header: '현재 설정 가격',
          key: '1',
        },
        Content: CurrentPriceInfoSection,
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
          header: '활성 가격 설정',
          key: '1',
        },
        Content: ManagePriceSection,
      },
    ],
  },
];

function ItemPriceEditDrawer({visible, onClose}: ItemPriceEditDrawerProps) {
  return (
    <Drawer title="가격관리" visible={visible} onClose={onClose} width={'60%'}>
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

export default ItemPriceEditDrawer;