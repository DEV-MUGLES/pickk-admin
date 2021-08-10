import React from 'react';
import styled from 'styled-components';
import {PageHeader, Tabs} from 'antd';

import MainLayout from '@src/components/common/templates/MainLayout';
import {
  BaseInfoForm,
  ServiceCenterInfoForm,
  ShippingPolicyForm,
  ClaimPolicyForm,
  SettlePolicyForm,
} from '@src/components/mypage-edit/form';
import {Space} from '@src/components/common/atoms';
import {WHITE} from '@src/common/constants/colors';

const {TabPane} = Tabs;

const TAB_PANE_INFO: {tab: string; content: React.ElementType}[] = [
  {tab: '기본정보', content: BaseInfoForm},
  {tab: '고객센터', content: ServiceCenterInfoForm},
  {tab: '배송비 정보', content: ShippingPolicyForm},
  {tab: '교환반품 정보', content: ClaimPolicyForm},
  {tab: '정산정보', content: SettlePolicyForm},
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
