import React from 'react';
import {GetServerSideProps} from 'next';

import {initializeApollo} from '@src/lib/apollo';
import {getCookie} from '@src/common/helpers';

export default function HomePage() {
  return <div>암온더 넥스트 레블</div>;
}

export const getServerSideProps: GetServerSideProps = async ({req}) => {
  try {
    const token = getCookie('accessToken', req);

    if (!token) {
      throw new Error('no token');
    }

    await initializeApollo(null, token);

    return {
      redirect: {
        destination: '/dashboard',
        permanent: false,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
};
