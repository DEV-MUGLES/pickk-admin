import Router from 'next/router';

import base from '@src/lib/services/Api';
import {setCookie, removeCookie} from '@src/lib/utils/Cookies';

export const login = (email: string, password: string) => {
  base()
    .post('/partner/token/', {email, password})
    .then(res => {
      setCookie('authtoken', res.data.access);
      setCookie('refreshtoken', res.data.refresh);
      Router.push('/dashboard');
    });
};

export const logout = () => {
  removeCookie('authtoken');
  removeCookie('refreshtoken');
  Router.push('/login');
};

const UserService = {
  login,
  logout,
};

export default UserService;
