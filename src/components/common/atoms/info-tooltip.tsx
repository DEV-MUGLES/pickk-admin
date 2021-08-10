import {Tooltip, TooltipProps} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';

import {GREY} from '@src/components/common/atoms/colors';

export type InfoTooltipProps = TooltipProps & {
  iconStyle?: React.CSSProperties;
};

function InfoTooltip({iconStyle, ...props}: InfoTooltipProps) {
  return (
    <Tooltip {...props}>
      <InfoCircleOutlined style={{color: GREY[600], ...iconStyle}} />
    </Tooltip>
  );
}

export default InfoTooltip;
