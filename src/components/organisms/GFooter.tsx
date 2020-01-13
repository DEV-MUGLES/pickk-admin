import {Layout} from 'antd';
import styled from 'styled-components';
import Colors from '@src/components/atoms/colors';

const {Footer} = Layout;

type GFooterProps = {
  style?: React.CSSProperties;
};

export default function GFooter({style}: GFooterProps) {
  return (
    <StyledGFooter style={style}>
      <p>
        핔㈜는 통신판매중개자이며, 통신판매의 당사자가 아닙니다. 상품, 상품정보,
        거래에 관한 의무와 책임은 판매자에게 있습니다.
      </p>
      <p>
        또한 판매자와 구매자간의 직거래에 대하여 당사는 관여하지 않기 때문에
        거래에 대해서는 책임을 지지 않습니다.
      </p>
      <p>Copyright © NAVER Corp. All rights reserved</p>
    </StyledGFooter>
  );
}

const StyledGFooter = styled(Footer)`
  text-align: center;
`;
