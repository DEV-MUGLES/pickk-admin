import styled from 'styled-components';
import {useRouter} from 'next/router';
import {Layout, Avatar, Dropdown, Menu, Typography, message} from 'antd';
import {DownOutlined, UserOutlined} from '@ant-design/icons';

import IconButton from '../atoms/button/icon';
import LogoDefaultIcon from '../icons/logo/_default';
import {WHITE} from '../../../common/constants/colors';

import {useMe} from '@src/common/hooks/apis';

const {Title} = Typography;
const {Header} = Layout;

export default function GHeader() {
  const router = useRouter();

  const {reset} = useMe();

  const signOut = async () => {
    try {
      if (confirm('로그아웃 하시겠습니까?')) {
        await reset();

        message.success('로그아웃 되었습니다.');
        router.push('/login');
      }
    } catch (error) {
      message.error('실패했습니다. err - ' + error);
    }
  };

  const dropDownMenu = (
    <Menu style={{width: 90, fontWeight: 300}}>
      <Menu.Item key="0" onClick={() => router.push('/mypage/edit')}>
        내 정보
      </Menu.Item>
      <Menu.Item key="1" onClick={signOut}>
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
      <StyleTitle onClick={() => router.push('/dashboard')}>
        스토어 어드민
      </StyleTitle>
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
  padding: 0 1.2rem;
`;

const StyleTitle = styled(Title).attrs({
  level: 3,
  style: {
    color: WHITE,
    margin: 0,
    marginLeft: '0.8rem',
  },
})``;

const StyledDropdown = styled(Dropdown)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
`;
