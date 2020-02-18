import {Layout, Avatar, Badge, Dropdown, Menu, Icon} from 'antd';
import Button from '@src/components/atoms/button';
import styled from 'styled-components';

import IconButton from '../atoms/button/icon';
import LogoDefaultIcon from '../atoms/logo/default';
import Colors from '../atoms/colors';
import Space from '../atoms/space';
import UserService from '@src/lib/services/User';

const {Header} = Layout;

export default function GHeader() {
  const dropDownMenu = (
    <Menu style={{width: 90, fontWeight: 300}}>
      <Menu.Item key="0">내 정보</Menu.Item>
      <Menu.Item key="1" onClick={UserService.logout}>
        로그아웃
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3">도움말</Menu.Item>
      <Menu.Item key="4">설정</Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <Space level={2} direction="ROW" />
      <IconButton
        Icon={
          <LogoDefaultIcon
            style={{width: '40px', height: '24px'}}
            fill={Colors.White}
          />
        }
        type="only-content"
        size="small"
        href="https://pickk.one"
      />
      <Button
        type="only-content"
        size="small"
        href="/dashboard"
        style={{
          color: Colors.White,
          fontSize: '24px',
        }}>
        스토어 어드민
      </Button>
      <Right>
        <Badge dot>
          <Icon
            type="bell"
            style={{
              fontSize: 18,
              color: Colors.White,
            }}
          />
        </Badge>
        <Space level={2} direction="ROW" />
        <Dropdown overlay={dropDownMenu} trigger={['click']}>
          <a href="#" style={{color: Colors.White}}>
            <Avatar shape="square" icon="user" size="small" />
            <Icon type="down" style={{marginLeft: 6}} />
          </a>
        </Dropdown>
      </Right>
    </StyledHeader>
  );
}

const StyledHeader = styled(Header)`
  background-color: #1a1a1a;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const Right = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: 24px;
  width: fit-content;
  height: fit-content;
`;
