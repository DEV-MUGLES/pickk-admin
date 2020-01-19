import React from 'react';
import styled from 'styled-components';

type IProps = {
  className?: string;
  direction?: 'COL' | 'ROW';
  level?: number;
  size?: number;
  pixel?: boolean;
};

export default function Space(props: IProps) {
  const length = props.size ? `${props.size}px` : `${4 + props.level * 8}px`;
  const thickness = '0.1px';

  const _Space = styled.div`
    background-color: transparent;
    width:${props.direction === 'COL' ? thickness : length};
    height:${props.direction === 'ROW' ? thickness : length};
  `;
  return <_Space className={props.className} />;
}

const defaultProps = {
  level: 0,
  direction: 'COL',
};

Space.defaultProps = defaultProps;
