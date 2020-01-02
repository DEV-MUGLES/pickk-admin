import { Layout, Menu, Icon } from "antd";
import styled from "styled-components";

const { Sider } = Layout;
const { SubMenu } = Menu;

const MENU_ITEMS = [
  {
    iconType: "dashboard",
    text: "대시보드",
    link: "/dashboard"
  },
  {
    iconType: "skin",
    text: "상품 관리",
    link: "/products"
  },
  {
    title: "판매 관리",
    iconType: "shop",
    items: [
      {
        text: "주문 조회",
        link: "/order"
      },
      {
        text: "발주/발송 관리",
        link: "/delivery"
      },
      {
        text: "배송현황 관리",
        link: "/delivery/situation"
      },
      {
        text: "취소 관리",
        link: "/claim/cancel"
      },
      {
        text: "반품 관리",
        link: "/claim/return"
      },
      {
        text: "교환 관리",
        link: "/claim/exchange"
      }
    ]
  },
  {
    title: "정산 관리",
    iconType: "dollar",
    items: [
      {
        text: "정산 내역",
        link: "/settle"
      },
      {
        text: "정산 내역 상세",
        link: "/settle/detail"
      },
      {
        text: "세금계산서 조회",
        link: "/tax"
      }
    ]
  }
];

export default function GNB() {
  return (
    <StyledSider>
      <div
        style={{
          height: "32px",
          background: "rgba(255, 255, 255, 0.2)",
          margin: "16px"
        }}
      />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["0"]}>
        {MENU_ITEMS.map((item, index) => {
          if (!item.title)
            return (
              <Menu.Item key={index}>
                <Icon type={item.iconType} />
                <span className="nav-text">{item.text}</span>
              </Menu.Item>
            );
          else {
            return (
              <SubMenu
                key={index}
                title={
                  <span>
                    <Icon type={item.iconType} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {item.items.map((item, _index) => (
                  <Menu.Item key={index + "_" + _index}>
                    <span className="nav-text">{item.text}</span>
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
    height: 100vh;
    position: fixed;
    left: 0;
    top: 64px;
  }
`;
