import {Button, ButtonProps as AntdButtonProps} from 'antd';

export type AntdButtonProps = AntdButtonProps;

export default interface ButtonProps
  extends AntdButtonProps,
    React.RefAttributes<HTMLElement> {
  type?:
    | 'default'
    | 'link'
    | 'ghost'
    | 'primary'
    | 'dashed'
    | 'danger'
    | 'only-content';
  size?: 'default' | 'small' | 'large' | 'xlarge';
}
