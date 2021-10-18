import styled from 'styled-components';
import {Layout} from 'antd';

import GHeader from '../organisms/GHeader';
import SiderGNB from '../organisms/GNB';
import GFooter from '../organisms/GFooter';

const {Content} = Layout;

type IProps = {
  children: React.ReactNode;
};

export default function MainLayout({children}: IProps) {
  return (
    <StyledLayout>
      <SiderGNB />
      <Layout>
        <GHeader />
        <Content>{children}</Content>
        <GFooter />
      </Layout>
    </StyledLayout>
  );
}

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;
