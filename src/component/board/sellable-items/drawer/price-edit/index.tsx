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
          header: '적용 중인 가격',
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
          header: '가격 수동 설정',
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

export default ItemPriceEditDrawer;
