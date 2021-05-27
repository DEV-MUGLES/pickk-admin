import React from 'react';
import {CollapseProps} from 'antd';
import {CollapsePanelProps} from 'antd/lib/collapse/CollapsePanel';

export type CollapseType = {
  props?: CollapseProps;
  panels: {
    props: CollapsePanelProps;
    Content: React.ElementType;
  }[];
};
