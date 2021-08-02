import {message} from 'antd';

export const handleUnauthorizedError = () => {
  if (window.location.href === '/login') {
    return;
  }

  message.info('세션 연결이 끊어졌습니다. 다시 로그인하십시오.', 1000);
  window.location.href = '/login';
};
