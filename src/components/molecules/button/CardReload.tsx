import React from 'react';
import {Button} from 'antd';

export type CardReloadButtonProps = {
  onClick: () => void;
};

export default function CardReloadButton({
  onClick,
}: CardReloadButtonProps) {
    return (
    <Button shape="circle" icon="reload" size="small" onClick={onClick} />
  );
}
