import styled from 'styled-components';
import {Layout} from 'antd';

import GHeader from '../organisms/GHeader';
import SiderGNB from '../organisms/GNB';
import GFooter from '../organisms/GFooter';

const {Content} = Layout;

const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledContent = styled(Content)`
  padding: 1.2rem;
`;

type IProps = {
  children: React.ReactNode;
};

export default function MainLayout({children}: IProps) {
  return (
    <StyledLayout>
      <SiderGNB />
      <Layout>
        <GHeader />
        <StyledContent>{children}</StyledContent>
        <GFooter />
      </Layout>
    </StyledLayout>
  );
}
