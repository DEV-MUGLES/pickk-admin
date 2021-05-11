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
    <>
      <GHeader />
      <StyledLayout>
        <SiderGNB />
        <Layout>
          <StyledContent>{children}</StyledContent>
          <GFooter />
        </Layout>
      </StyledLayout>
    </>
  );
}

const StyledLayout = styled(Layout)`
  min-height: calc(100vh - 64px);
`;

const StyledContent = styled(Content)`
  padding: 1.2rem;
`;
