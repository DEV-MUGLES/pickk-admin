import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Colors from "@src/components/atoms/colors";
import { Layout, Input, Icon, Checkbox, Button ,Typography } from 'antd';
import Space from "@src/components/atoms/space";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

export default function LoginForm() {
    
    const [loginFormState, setLoginFormState] = useState({id:'', pw:''});
    const handleLoginFormChange = (e) => setLoginFormState({...loginFormState, [e.target.name]:[e.target.value],});
    const [isRememberIDPW, setIsRememberIDPW] = useState(true);
    const [isKeepLogin, setIsKeepLogin] = useState(true);
    const handleLoginFormSubmit = () => {
        const state = {'isRememberIDPW' : isRememberIDPW, 'isKeepLogin' : isKeepLogin, 'loginFormState' : {'id' : loginFormState.id, 'pw' : loginFormState.pw}}
        console.log(state);
    }
    
  return (
      <LoginFormLayout>
        <LoginFormContent>
        <LoginFormTitle level={2}>로그인</LoginFormTitle>
            <Space level={2} direction="COL" />
            <Input
            name="id"
            value={loginFormState.id}
            placeholder="아이디"
            onChange={handleLoginFormChange}
            size="large"
            style={{width:"400px"}}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <Space level={1} direction="COL" />
            <Input
                name="pw"
                value={loginFormState.pw}
                placeholder="비밀번호"
                onChange={handleLoginFormChange}        
                size="large"
                style={{width:"400px"}}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <Space level={4} direction="COL" />

            <CheckboxWrapper>
                <Checkbox checked={isRememberIDPW} onClick={() => setIsRememberIDPW(!isRememberIDPW)}>아이디/비밀번호 기억하기</Checkbox>
                <Space level={0.5} direction="COL" />
                <Checkbox checked={isKeepLogin} style={{margin:'0px'}} onClick={() => setIsKeepLogin(!isKeepLogin)}>로그인 유지하기</Checkbox>
            </CheckboxWrapper>
            <Space level={4} direction="COL" />

            <Button type="primary" onClick={handleLoginFormSubmit}>로그인</Button>
            <Space level={4} direction="COL" />
        </LoginFormContent>
        <LoginFormFooter>
            로그인 푸터입니당
        </LoginFormFooter>
      </LoginFormLayout>
  );
}

const LoginFormLayout = styled(Layout)`
  width:fit-content;
  
  display:flex;
  flex-direction:column;
  align-items:center;

  background-color: ${Colors.White};
  padding:50px;
`

const LoginFormTitle = styled(Title)`
    width:fit-content
    margin-left:0px;
    margin-right:auto;
`

const LoginFormContent = styled(Content)`
    display:flex;
    flex-direction:column;
    align-items:center;
`

const LoginFormFooter = styled(Footer)`
    background-color: ${Colors.White};
`

const CheckboxWrapper = styled.div`
  margin-left:0;
  margin-right:auto;

  display:flex;
  flex-direction:column;
  align-items:flex-start;
`