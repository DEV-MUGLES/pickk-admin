import React from 'react';

import {GetServerSideProps} from 'next';

export default function Home() {
  return <div>You can't see this page</div>;
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/dashboard',
      permanent: false,
    },
  };
};
