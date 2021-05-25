import React from 'react';
import {Drawer, DrawerProps, Space} from 'antd';

export type ItemPriceEditDrawerProps = Pick<DrawerProps, 'visible' | 'onClose'>;

function ItemPriceEditDrawer({visible, onClose}: ItemPriceEditDrawerProps) {
  return (
    <Drawer title="가격관리" visible={visible} onClose={onClose} width={'50%'}>
      <Space direction="vertical" style={{width: '100%'}} size="small"></Space>
    </Drawer>
  );
}

export default ItemPriceEditDrawer;
