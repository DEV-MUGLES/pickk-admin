import React from 'react';
import styled from 'styled-components';

import LoginSection from '@src/components/organisms/sections/login';
import {P} from '@src/components/atoms';
import {GREY, WHITE} from '@src/components/atoms/colors';

import media from '@src/styles/media';

export default function LoginPage() {
  return (
    <Wrapper>
      <Section>
        <WelcomeSection>
          <P
            level={8}
            fontWeight="bold"
            color={WHITE}
            style={{marginTop: '1.2rem', marginBottom: '2rem'}}>
            반갑습니다 🙋‍♂️
          </P>
          <P level={1} fontWeight="regular" color={WHITE}>
            핔 스토어 어드민에서
            <br />
            상품, 주문, 정산 등<br />
            모든 서비스를 이용하세요.
          </P>
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

  padding: 2rem;

  background-color: ${GREY[800]};

  ${media.phone`
    display: none;
  `}
`;

const FooterText = styled(P).attrs({
  color: GREY[600],
})`
  margin-top: 1.2rem;
`;
