import Button from "../";
import ButtonProps, { AntdButtonProps } from "../button";

export interface IProps extends ButtonProps {
  Icon: React.ReactElement;
}

export default function IconButton(props: IProps) {
  const basicProps: ButtonProps = props;

  return (
    <Button {...basicProps}>
      {props.Icon}
      {props.children}
    </Button>
  );
}
