import styled from "styled-components";
import { Layout } from "antd";

import SiderGNB from "../organisms/GNB";
import GHeader from "../organisms/GHeader";

const { Content, Footer } = Layout;

type IProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: IProps) {
  return (
    <Layout>
      <GHeader />
      <Layout>
        <SiderGNB />
        <Layout>
          <StyledContent>{children}</StyledContent>
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}

const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
  padding: 24;
  text-align: center;
`;
