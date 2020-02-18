import Router from 'next/router';

import base from '@src/lib/services/Api';
import {setCookie} from '@src/lib/utils/Cookies';

export const login = (email: string, password: string) => {
  base()
    .post('/partner/token/', {email, password})
    .then(res => {
      setCookie('authtoken', res.data.access);
      setCookie('refreshtoken', res.data.refresh);
      Router.push('/dashboard');
    });
};

const UserService = {
  login,
};

export default UserService;
