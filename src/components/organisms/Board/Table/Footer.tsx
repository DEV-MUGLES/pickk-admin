import React from "react";
import styled from "styled-components";
import { Button } from "antd";

import { TableActionType } from "./table";
import Space from "@src/components/atoms/space";

export type TableFooterProps = {
  selectedRowKeys: number[];
  footActions?: TableActionType;
};

export default function TableFooter({
  selectedRowKeys,
  footActions
}: TableFooterProps) {
  return (
    <Wrapper>
      {footActions.map((item, index) => (
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
  height: 100%;
  align-items: center;
`;
