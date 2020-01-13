import React from "react";
import styled from "styled-components";
import { Layout } from 'antd';
import Colors from "@src/components/atoms/colors";
import LogoDefaultIcon from "@src/components/atoms/logo/default";
import Space from "@src/components/atoms/space";
import LoginForm from "@src/components/organisms/LoginForm";
import GFooter from "@src/components/organisms/GFooter";

export default function Login() {
  const { Content } = Layout;
  return (
    <Layout>
    <Content style={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Space level={10} direction="COL" />
          <LogoDefaultIcon
                  style={{ width: "80px", height: "48px" }}
                  fill={Colors.Black}
          />
          <div>pickk admin</div>
          <Space level={2} direction="COL" />

          <LoginForm/>
    </Content>
    <Space level={8} direction="COL" />
    <GFooter style={{backgroundColor:'#001529', color:Colors.LightGrey}}/>
    </Layout>
  );
}
