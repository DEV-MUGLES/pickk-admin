import {useState, useEffect} from 'react';
import axios from 'axios';

class RequestConfig {
  public baseURL: string;
  public headers?: any;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  public setToken = (token?: any) => {
    if (token) {
      this.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  };
}

const base = (token?: string) => {
  const requestConfig = new RequestConfig(process.env.API_HOST);
  requestConfig.setToken(token);
  return axios.create(requestConfig);
};

export const useAxios = (
  requestType: 'GET' | 'POST',
  path: string,
  options: any = {},
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const {token, variables} = options;
      const axiosInstance = token ? base(token) : base();
      setError(false);
      setLoading(true);
      try {
        const result =
          requestType === 'GET'
            ? await axiosInstance.get(path, {params: variables})
            : await axiosInstance.post(path, variables);
        setData(result.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [path]);

  return {loading, error, data};
};

export default base;
