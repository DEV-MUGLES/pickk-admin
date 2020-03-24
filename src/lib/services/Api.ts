import axios from 'axios';

import {getCookie} from '../utils/Cookies';

class RequestConfig {
  public baseURL: string;
  // tslint:disable-next-line: no-any
  public headers?: any;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public setToken = (token?: string) => {
    if (token) {
      this.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  };
}

const base = (auth?: boolean) => {
  const requestConfig = new RequestConfig(process.env.API_HOST);
  if (auth) {
    requestConfig.setToken(getCookie('authtoken'));
  }
  return axios.create(requestConfig);
};

export default base;
