import Button from "../";
import ButtonProps from "../button";

export interface IProps extends ButtonProps {
  Icon: React.ReactElement;
}

export default function IconButton(props: IProps) {
  const buttonProps: ButtonProps = props;

  return (
    <Button {...buttonProps}>
      {props.Icon}
      {props.children}
    </Button>
  );
}
