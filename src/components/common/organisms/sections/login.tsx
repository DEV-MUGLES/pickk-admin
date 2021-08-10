import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {Form, Input, Button, message, Typography} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

import {setCookie} from '@src/lib/utils';
import LogoDefaultIcon from '@src/components/common/icons/logo/default';
import {Space} from '@src/components/common/atoms';
import {useLoginByCode} from '@src/common/hooks/apis';

const {Title: _Title} = Typography;

export default function LoginSection() {
  const router = useRouter();

  const login = useLoginByCode();

  const handleFinish = async (value) => {
    const {code, password} = value;
    try {
      const {data, error} = await login({
        loginByCodeInput: {
          code,
          password,
        },
      });

      if (!data || error) {
        message.warning('로그인에 실패했습니다' + error);
        return;
      }

      setCookie('accessToken', data.loginByCode.access);
      setCookie('refreshToken', data.loginByCode.refresh);

      message.info('로그인 성공');
      router.push('/dashboard');
    } catch (error) {
      message.warning('로그인에 실패했습니다' + error);
    }
  };

  return (
    <LoginForm layout="vertical" onFinish={handleFinish}>
      <LogoDefaultIcon />
      <Title>슈퍼어드민</Title>
      <Space level={3} />
      <Form.Item
        label="아이디"
        name="code"
        rules={[
          {
            required: true,
            message: '아이디를 입력해주세요',
          },
        ]}>
        <Input placeholder="id" prefix={<UserOutlined />} size="large" />
      </Form.Item>
      <Form.Item
        label="비밀번호"
        name="password"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력해주세요',
          },
        ]}>
        <Input.Password
          placeholder="password"
          prefix={<LockOutlined />}
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </LoginForm>
  );
}

const LoginForm = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 4rem 4.8rem;
`;

const Title = styled(_Title).attrs({
  level: 3,
  style: {
    marginTop: '0.8rem',
    marginBottom: 'auto',
  },
})``;
