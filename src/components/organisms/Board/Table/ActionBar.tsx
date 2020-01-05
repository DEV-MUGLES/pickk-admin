import React from "react";
import styled from "styled-components";
import { Button } from "antd";
import Space from "@src/components/atoms/space";

export type TableActionBarProps = {
  selectedRowKeys: number[];
  actions: {
    icon?: string;
    text: string;
    onClick: (number) => void;
  }[];
};

export default function TableActionBar({
  selectedRowKeys,
  actions
}: TableActionBarProps) {
  return (
    <Wrapper>
      {actions.map((item, index) => (
        <>
          <Button
            disabled={selectedRowKeys.length === 0}
            key={index}
            icon={item.icon}
            onClick={() => item.onClick(selectedRowKeys)}
          >
            {item.text}
          </Button>
          <Space direction="ROW" />
        </>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;
