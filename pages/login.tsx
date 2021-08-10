import React from 'react';
import styled from 'styled-components';
import {Typography} from 'antd';

import LoginSection from '@src/components/common/organisms/sections/login';
import {GREY, WHITE} from '@src/common/constants/colors';

import media from '@src/common/styles/media';

const {Text, Title} = Typography;

export default function LoginPage() {
  return (
    <Wrapper>
      <Section>
        <WelcomeSection>
          <Title level={2} style={{marginTop: '1.2rem', color: WHITE}}>
            반갑습니다 🙋‍♂️
          </Title>
          <Title level={4} style={{color: WHITE}}>
            핔 스토어 어드민에서
            <br />
            상품, 주문, 정산 등<br />
            모든 서비스를 이용하세요.
          </Title>
        </WelcomeSection>
        <LoginSection />
      </Section>
      <FooterText>
        🖤 (주) 생각하는머글들 | 문의: 070-4142-0027, cs@mugles.com 🖤
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

  background-color: ${GREY[200]};
`;

const Section = styled.section`
  display: flex;
  flex-direction: row;

  background-color: ${WHITE};
  box-shadow: 0 15px 24px 0 rgb(137 138 154 / 15%);
`;

const WelcomeSection = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;

  padding: 3.2rem;
  padding-right: 6rem;

  background-color: ${GREY[800]};

  ${media.phone`
    display: none;
  `}
`;

const FooterText = styled(Text).attrs({
  style: {
    color: GREY[600],
    marginTop: '1.2rem',
  },
})``;
