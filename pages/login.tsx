import React from "react";
import styled from "styled-components";
import Colors from "@src/components/atoms/colors";
import LogoDefaultIcon from "@src/components/atoms/logo/default";
import Space from "@src/components/atoms/space";

export default function Login() {
  return (
  <Layout>
    <Space level={10} direction="COL" />
    <LogoDefaultIcon
            style={{ width: "80px", height: "48px" }}
            fill={Colors.Black}
    />
    <div>pickk admin</div>
    <Space level={10} direction="COL" />

  </Layout>
  );
}

const Layout = styled.body`
  width:fit-content;
  margin:0 auto;

  display:flex;
  flex-direction:column;
  align-items:center;

  background-color: ${Colors.LightGrey};;
`