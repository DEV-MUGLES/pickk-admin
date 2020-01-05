import React from "react";
import styled from "styled-components";
import { Typography } from "antd";

import ExcelDownloadButton, {
  ExcelDownloadButtonProps
} from "@src/components/molecules/button/ExcelDownload";

export default function TableHeader(props: ExcelDownloadButtonProps) {
  return (
    <Wrapper>
      <Typography.Text strong style={{ marginRight: "auto" }}>
        {props.title + ` (총 ${props.dataSource.length}개)`}
      </Typography.Text>
      <ExcelDownloadButton {...props} />
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
