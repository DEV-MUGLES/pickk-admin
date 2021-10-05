import {useCouriers} from '@src/common/hooks/apis';

export const useGetCourierId = () => {
  const {data} = useCouriers();

  const courierIdMapper =
    data?.reduce((acc, curr) => {
      return {...acc, [curr.name]: curr.id};
    }, {}) ?? {};

  const getCourierId = (name: string) => {
    return courierIdMapper[name];
  };

  return {getCourierId};
};
