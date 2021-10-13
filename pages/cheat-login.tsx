import React from 'react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {Button, Form, Input, Select, message, Typography} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';

import {palette} from '@pickk/design-token';

import media from '@src/common/styles/media';
import {useLoginRootSeller, useSellers} from '@src/common/hooks/apis';
import {setCookie} from '@src/common/helpers';

const {Text, Title} = Typography;
const {Option} = Select;

const StyledForm = styled(Form)`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 4rem 4.8rem;
`;

export default function CheatLoginPage() {
  const router = useRouter();
  const {data: sellers} = useSellers();
  const {loginRootSeller} = useLoginRootSeller();

  const redirect = () => {
    router.push(router.query?.to?.toString() ?? '/');
  };

  const handleFinish = async (form: {
    code: string;
    password: string;
    sellerBrandNameKor: string;
  }) => {
    try {
      const sellerId = sellers.find(
        (v) => v.brand.nameKor === form.sellerBrandNameKor,
      )!.id;

      if (!sellerId) {
        return;
      }

      const {data} = await loginRootSeller(form.code, form.password, sellerId);

      setCookie('accessToken', data.loginRootSeller.access);
      setCookie('refreshToken', data.loginRootSeller.refresh);
      message.info('로그인 성공');
      redirect();
    } catch (err) {
      message.warning('로그인에 실패했습니다' + err);
    }
  };

  return (
    <Wrapper>
      <Section>
        <WelcomeSection>
          <Title level={2} style={{marginTop: '1.2rem', color: palette.white}}>
            반갑습니다 🙋‍♂️
          </Title>
          <Title level={4} style={{color: palette.white}}>
            핔 스토어 어드민에서
            <br />
            상품, 주문, 정산 등<br />
            모든 서비스를 이용하세요.
          </Title>
        </WelcomeSection>
        <StyledForm onFinish={handleFinish}>
          <Form.Item
            label="관리자 아이디"
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
            label="관리자 비밀번호"
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
          <Form.Item
            name="sellerBrandNameKor"
            label="판매자"
            rules={[{required: true}]}>
            <Select allowClear showSearch>
              {sellers?.map((seller) => (
                <Option key={seller.id} value={seller.brand.nameKor}>
                  {seller.brand.nameKor}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
        </StyledForm>
      </Section>
      <FooterText>
        🖤 (주) 생각하는머글들 | 문의: 070-4142-0027, cs@mugles.com🖤
      </FooterText>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: ${palette.gray1};
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;

  background-color: ${palette.white};
  box-shadow: 0 15px 24px 0 rgb(137 138 154 / 15%);
`;

const WelcomeSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 3.2rem;
  padding-right: 6rem;

  background-color: ${palette.gray6};

  ${media.phone`
    display: none;
  `}
`;

const FooterText = styled(Text).attrs({
  style: {
    color: palette.gray5,
    marginTop: '1.2rem',
  },
})``;
