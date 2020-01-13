import React, {useState} from 'react';
import { Layout, Input, Icon, Checkbox, Button ,Typography } from 'antd';
import styled from "styled-components";
import Colors from "@src/components/atoms/colors";
import Space from "@src/components/atoms/space";

const { Title } = Typography;
const { Content, Footer } = Layout;

export default function LoginForm() {
    
    const [loginFormState, setLoginFormState] = useState({id:'', pw:''});
    const handleLoginFormChange = (e) => setLoginFormState({...loginFormState, [e.target.name]:e.target.value,});
    const [isRememberIDPW, setIsRememberIDPW] = useState(true);
    const handleLoginFormSubmit = () => {
        const state = {'isRememberIDPW' : isRememberIDPW, 'loginFormState' : {'id' : loginFormState.id, 'pw' : loginFormState.pw}}
        console.log(state);
    }

    const inputStyle = {width:"400px"};
    const inputPrefixStyle = {color: "rgba(0,0,0,.25)"}
    
  return (
      <LoginFormLayout>
        <LoginFormContent>
            <Title level={2}>로그인</Title>
            <Space level={2}/>
            <Input
            name="id"
            value={loginFormState.id}
            placeholder="아이디"
            onChange={handleLoginFormChange}
            size="large"
            style={inputStyle}
            prefix={<Icon type="user" style={inputPrefixStyle} />}
            />
            <Space level={1}/>
            <Input.Password
                name="pw"
                value={loginFormState.pw}
                placeholder="비밀번호"
                onChange={handleLoginFormChange}        
                size="large"
                style={inputStyle}
                prefix={<Icon type="lock" style={inputPrefixStyle} />}
            />
            <Space level={1}/>

            <Checkbox checked={isRememberIDPW} onClick={() => setIsRememberIDPW(!isRememberIDPW)}>아이디/비밀번호 기억하기</Checkbox>
            <Space level={5}/>

            <LoginButton type="primary" onClick={handleLoginFormSubmit}>로그인</LoginButton>
            <Space level={4}/>
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

const LoginFormContent = styled(Content)`
    display:flex;
    flex-direction:column;
`

const LoginButton = styled(Button)`
    width:100px;
    margin: 0 auto;
`

const LoginFormFooter = styled(Footer)`
    background-color: ${Colors.White};
`

