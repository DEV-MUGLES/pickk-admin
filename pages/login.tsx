import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';
import {palette} from '@pickk/design-token';

import LoginSection from '@src/components/login';

import media from '@src/common/styles/media';

const {Text, Title} = Typography;

export default function LoginPage() {
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
        <LoginSection />
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
