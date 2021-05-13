import React from 'react';
import styled from 'styled-components';

type IProps = {
  src: string;
  width?: string | number;
  height?: string | number;
  circle?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  // tslint:disable-next-line: no-any
  children?: any;
  over?: boolean;
  border?: boolean;
};

const Img = (props: IProps) => {
  const Image = styled.img`
    width: ${props.width || '100%'};
    border-radius: ${props.circle && '50%'};
    box-sizing: border-box;
    ${props.over
      ? `
      max-height:${props.height || '100%'};
      overflow : hidden;
      object-fit : cover;
      object-position : top;
    `
      : `height: ${props.height || '100%'};`}
    ${props.border && `border:0.01rem solid #f0f0f0`}
  `;
  const {className, src, onClick, style, children} = props;
  return <Image {...{className, src, onClick, style}}>{children}</Image>;
};

export default Img;
