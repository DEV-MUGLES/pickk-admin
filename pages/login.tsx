import React from 'react';
import {Layout} from 'antd';
import styled from 'styled-components';

import LoginForm from '@src/components/organisms/LoginForm';
import GFooter from '@src/components/organisms/GFooter';
import LogoAdminIcon from '@src/components/atoms/logo/admin';
import Colors from '@src/components/atoms/colors';
import Space from '@src/components/atoms/space';

const {Content} = Layout;

export default function Login() {
  return (
    <Layout style={{height: '100vh'}}>
      <StyledContent>
        <Space level={10} />
        <LogoAdminIcon
          style={{width: '120px', height: '72px'}}
          fill={Colors.Black}
        />
        <Space level={2} />
        <LoginForm />
      </StyledContent>
      <Space level={8} />
      <GFooter style={{backgroundColor: '#001529', color: '#a3acbf'}} />
    </Layout>
  );
}

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  flex: 1;
`;
