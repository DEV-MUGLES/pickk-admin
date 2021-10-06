import {Tooltip, TooltipProps} from 'antd';
import {palette} from '@pickk/design-token';
import {InfoCircleOutlined} from '@ant-design/icons';

export type InfoTooltipProps = TooltipProps & {
  iconStyle?: React.CSSProperties;
};

function InfoTooltip({iconStyle, ...props}: InfoTooltipProps) {
  return (
    <Tooltip {...props}>
      <InfoCircleOutlined style={{color: palette.gray4, ...iconStyle}} />
    </Tooltip>
  );
}

export default InfoTooltip;
