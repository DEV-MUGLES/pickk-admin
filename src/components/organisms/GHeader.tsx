import styled from 'styled-components';
import {useRouter} from 'next/router';
import {Layout, Avatar, Dropdown, Menu} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';

import IconButton from '../atoms/button/icon';
import Button from '@src/components/atoms/button';
import LogoDefaultIcon from '../atoms/logo/default';
import {WHITE} from '../atoms/colors';

import UserService from '@src/lib/services/User';

const {Header} = Layout;

export default function GHeader() {
  const router = useRouter();

  const dropDownMenu = (
    <Menu style={{width: 90, fontWeight: 300}}>
      <Menu.Item key="0">내 정보</Menu.Item>
      <Menu.Item key="1" onClick={UserService.logout}>
        로그아웃
      </Menu.Item>
    </Menu>
  );

  return (
    <StyledHeader>
      <IconButton
        Icon={
          <LogoDefaultIcon
            style={{width: '2.4rem', height: '1.4rem'}}
            fill={WHITE}
          />
        }
        type="only-content"
        size="small"
        href="https://pickk.one"
      />
      <Button
        type="only-content"
        size="xlarge"
        onClick={() => router.push('/dashboard')}
        style={{
          color: WHITE,
        }}>
        스토어 어드민
      </Button>
      <StyledDropdown overlay={dropDownMenu} trigger={['click']}>
        <a href="#" style={{color: WHITE}}>
          <Avatar shape="square" icon={<UserOutlined />} size="small" />
          <DownOutlined style={{marginLeft: '0.6rem'}} />
        </a>
      </StyledDropdown>
    </StyledHeader>
  );
}

const StyledHeader = styled(Header)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 2rem;
`;

const StyledDropdown = styled(Dropdown)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
