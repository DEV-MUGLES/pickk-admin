import {useState, useEffect} from 'react';
import {AxiosQueryResponse} from '@src/types';

export const useAxiosQuery = <T>(query) => (
  // tslint:disable-next-line: no-any
  parameters: any[],
): AxiosQueryResponse<T> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState<T>(null);
  useEffect(() => {
    const fetchData = async () => {
      setError(false);
      setLoading(true);
      try {
        const res = await query(...parameters);
        setData(res);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, parameters);

  return {loading, error, data};
};
