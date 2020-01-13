import {Layout} from 'antd'
import styled from "styled-components";

const {Footer} = Layout;

export default function LoginFooter() {
    return(
        <StyledFooter>
            로그인푸터
        </StyledFooter>
    );  
    
}


const StyledFooter = styled(Footer)`
    text-align:center;
`