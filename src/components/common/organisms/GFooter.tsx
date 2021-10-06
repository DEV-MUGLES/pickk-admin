import {Layout} from 'antd';
import styled from 'styled-components';

const {Footer} = Layout;

export default function GFooter() {
  return (
    <StyledGFooter>
      | 상호 : (주)생각하는머글들 | 주소 : 서울특별시 서초구 강남대로 101안길 17
      403호 | 사업자등록번호 : 435-88-01445 | 통신판매업신고 : 제
      2020-서울서초-0486 | 이메일 : cs@mugles.com
      <br />
      2020 © mugles inc. All rights reserved
    </StyledGFooter>
  );
}

const StyledGFooter = styled(Footer)`
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 12px;
`;
