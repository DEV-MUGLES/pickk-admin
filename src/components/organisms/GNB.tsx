import {Layout, Menu} from 'antd';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import {DollarOutlined, ShopOutlined, SkinOutlined} from '@ant-design/icons';

const {Sider} = Layout;
const {SubMenu} = Menu;

const MENU_ITEMS = [
  {
    icon: SkinOutlined,
    text: '상품 관리',
    link: '/items',
  },
  {
    title: '판매 관리',
    icon: ShopOutlined,
    items: [
      {
        text: '주문 조회',
        link: '/order-items',
      },
      {
        text: '발주/발송 관리',
        link: '/placements',
      },
      {
        text: '배송현황 관리',
        link: '/shipments',
      },
      {
        text: '취소 조회',
        link: '/request/cancel',
      },
      {
        text: '반품 관리',
        link: '/request/refund',
      },
      {
        text: '교환 관리',
        link: '/request/exchange',
      },
      ,
    ],
  },
  {
    title: '정산 관리',
    icon: DollarOutlined,
    items: [
      {
        text: '정산 내역',
        link: '/settlements',
      } /*
      {
        text: '정산 내역 상세',
        link: '/settle/detail',
      },
      {
        text: '세금계산서 조회',
        link: '/tax',
      },*/,
    ],
  },
];

export default function GNB() {
  const router = useRouter();

  return (
    <StyledSider collapsible>
      <div
        style={{
          height: '32px',
          background: 'rgba(255, 255, 255, 0.2)',
          margin: '16px',
        }}
      />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[router.pathname]}>
        {MENU_ITEMS.map((item) => {
          const {icon: Icon} = item;
          if (!item.title) {
            return (
              <Menu.Item key={item.link}>
                <a href={item.link}>
                  <Icon />
                  <span className="nav-text">{item.text}</span>
                </a>
              </Menu.Item>
            );
          } else {
            return (
              <SubMenu
                key={`sub_${item.title}`}
                title={
                  <span>
                    <Icon />
                    <span>{item.title}</span>
                  </span>
                }>
                {item.items.map((subItem) => (
                  <Menu.Item key={subItem.link}>
                    <a href={subItem.link}>
                      <span className="nav-text">{subItem.text}</span>
                    </a>
                  </Menu.Item>
                ))}
              </SubMenu>
            );
          }
        })}
      </Menu>
    </StyledSider>
  );
}

const StyledSider = styled(Sider)`
  && {
    overflow: auto;
    width: 200px;
  }
`;
