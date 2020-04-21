import React from 'react';
import MainLayout from '@src/components/templates/MainLayout';

export default function Dashboard() {
  return (
    <MainLayout>
      대시보드 준비중입니다. 좌측 메뉴 페이지를 이동해주세요.
    </MainLayout>
  );
}

Dashboard.getInitialProps = () => {
  return {};
};
