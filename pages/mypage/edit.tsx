import React from 'react';
import styled from 'styled-components';
import {PageHeader, Tabs} from 'antd';

import MainLayout from '@src/components/templates/MainLayout';
import {
  BaseInfoEditForm,
  ShippingPolicyEditForm,
  ClaimPolicyEditForm,
  ReturnAddressEditForm,
} from '@src/board/mypage/form';
import {Space} from '@src/components/atoms';
import {WHITE} from '@src/components/atoms/colors';

const {TabPane} = Tabs;

const TAB_PANE_INFO: {tab: string; content: any}[] = [
  {tab: '기본정보', content: BaseInfoEditForm},
  {tab: '배송정책', content: ShippingPolicyEditForm},
  {tab: '교환/환불 정책', content: ClaimPolicyEditForm},
  {tab: '환불 주소', content: ReturnAddressEditForm},
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
