import React from 'react';
import {Layout} from 'antd';
import styled from 'styled-components';

import LoginForm from '@src/components/organisms/LoginForm';
import GFooter from '@src/components/organisms/GFooter';
import Colors from '@src/components/atoms/colors';
import LogoAdminIcon from '@src/components/atoms/logo/admin';
import Space from '@src/components/atoms/space';

const {Content} = Layout;

export default function Login() {
  return (
    <Layout>
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
      <GFooter style={{backgroundColor: '#001529', color: Colors.LightGrey}} />
    </Layout>
  );
}

const StyledContent = styled(Content)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
