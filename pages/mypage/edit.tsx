import React from 'react';
import styled from 'styled-components';
import {PageHeader, Tabs} from 'antd';

import MainLayout from '@src/components/templates/MainLayout';
import {
  BaseInfoEditForm,
  ServiceCenterInfoEditForm,
  ShippingPolicyEditForm,
  ClaimPolicyEditForm,
  SettlePolicyEditForm,
} from '@src/component/mypage/form';
import {Space} from '@src/components/atoms';
import {WHITE} from '@src/components/atoms/colors';

const {TabPane} = Tabs;

const TAB_PANE_INFO: {tab: string; content: React.ElementType}[] = [
  {tab: '기본정보', content: BaseInfoEditForm},
  {tab: '고객센터', content: ServiceCenterInfoEditForm},
  {tab: '배송비 정보', content: ShippingPolicyEditForm},
  {tab: '교환반품 정보', content: ClaimPolicyEditForm},
  {tab: '정산정보', content: SettlePolicyEditForm},
];

function MyPageEditPage() {
  return (
    <MainLayout>
      <PageHeader
        ghost={false}
        onBack={() => window.history.back()}
        title="내 정보"
        subTitle="정보 수정 후 저장 버튼을 눌러주세요."
      />
      <Space level={2} />
      <Wrapper>
        <Tabs tabPosition="left">
          {TAB_PANE_INFO.map(({tab, content: Content}, index) => (
            <StyledTabPane tab={tab} key={index}>
              <Content />
            </StyledTabPane>
          ))}
        </Tabs>
      </Wrapper>
    </MainLayout>
  );
}

export default MyPageEditPage;

export const Wrapper = styled.div`
  background-color: ${WHITE};
  display: flex;
  flex-direction: column;
  padding: 16px 24px;
`;

export const StyledTabPane = styled(TabPane)`
  padding: 16px 24px;
`;
