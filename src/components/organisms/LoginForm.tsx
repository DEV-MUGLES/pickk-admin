import React, {useState, useEffect, CSSProperties} from 'react';
import {Layout, Input, Icon, Checkbox, Button, Typography, message} from 'antd';
import styled from 'styled-components';

import Colors from '@src/components/atoms/colors';
import Space from '@src/components/atoms/space';
import UserService from '@src/lib/services/User';

const {Title, Text} = Typography;
const {Content, Footer} = Layout;

export default function LoginForm() {
  const [loginFormState, setLoginFormState] = useState({
    email: '',
    password: '',
  });

  const [isRememberIDPW, setIsRememberIDPW] = useState(true);
  const [loading, setLoading] = useState(false);

  const inputStyle: CSSProperties = {width: '400px'};
  const inputPrefixStyle = {color: 'rgba(0,0,0,.25)'};

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(e.target.value)) {
      message.warning('한글 입력은 지원하지 않습니다. 영문으로 전환해주세요.');
      return;
    }
    setLoginFormState({...loginFormState, [e.target.name]: e.target.value});
  };

  const handleLogin = async () => {
    setLoading(true);
    await UserService.login(loginFormState.email, loginFormState.password);
    setLoading(false);
  };

  const handlePasswordKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <LoginFormLayout>
      <LoginFormContent>
        <Title level={2}>로그인</Title>
        <Space level={2} />
        <Input
          name="email"
          value={loginFormState.email}
          placeholder="아이디"
          onChange={handleLoginFormChange}
          size="large"
          style={inputStyle}
          prefix={<Icon type="user" style={inputPrefixStyle} />}
        />
        <Space level={1} />
        <Input.Password
          name="password"
          value={loginFormState.password}
          placeholder="비밀번호"
          onChange={handleLoginFormChange}
          onKeyDown={handlePasswordKeyDown}
          size="large"
          style={inputStyle}
          prefix={<Icon type="lock" style={inputPrefixStyle} />}
        />
        <Space level={1} />

        <Checkbox
          checked={isRememberIDPW}
          onClick={() => setIsRememberIDPW(!isRememberIDPW)}>
          아이디/비밀번호 기억하기
        </Checkbox>
        <Space level={5} />

        <LoginButton type="primary" onClick={handleLogin} loading={loading}>
          로그인
        </LoginButton>
      </LoginFormContent>
      <LoginFormFooter>
        <Title level={4}> 문의번호</Title>
        <Text>070-4142-0027, 010-9508-2801</Text>
      </LoginFormFooter>
    </LoginFormLayout>
  );
}

const LoginFormLayout = styled(Layout)`
  width: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: ${Colors.White};
  padding: 50px;
`;

const LoginFormContent = styled(Content)`
  display: flex;
  flex-direction: column;
  height: fit-content;
`;

const LoginButton = styled(Button)`
  width: 100px;
  margin: 0 auto;
`;

const LoginFormFooter = styled(Footer)`
  background-color: ${Colors.White};
  width: 100%;
  padding: 0;
  border-top: 1px solid ${Colors.RegularGrey};
  padding-top: 16px;
`;
