import styled from 'styled-components';
import {Layout} from 'antd';

import SiderGNB from '../organisms/GNB';
import GHeader from '../organisms/GHeader';
import GFooter from '../organisms/GFooter';
import Colors from '../atoms/colors';

const {Content, Footer} = Layout;

type IProps = {
  children: React.ReactNode;
};

export default function MainLayout({children}: IProps) {
  return (
    <>
      <GHeader />
      <Wrapper>
        <SiderGNB />
        <StyledLayout>
          <StyledContent>{children}</StyledContent>
          <GFooter />
        </StyledLayout>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  min-height: calc(100vh - 64px);
`;

const StyledContent = styled(Content)`
  margin: 24px 16px 0;
  overflow: initial;
  padding: 24;
  text-align: center;
`;

const StyledLayout = styled(Layout)`
  background-color: #eaedf0;
`;
