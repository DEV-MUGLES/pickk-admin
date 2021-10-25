import {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import dayjs from 'dayjs';
import {OrderItemSearchFilter} from '@pickk/common';

import {
  PreviewDataResult,
  PreviewType,
} from '@components/common/organisms/board-preview';

const GET_ORDER_ITEMS_COUNT = gql`
  query searchMeSellerOrderItemsCount($searchFilter: OrderItemSearchFilter) {
    searchMeSellerOrderItemsCount(searchFilter: $searchFilter)
  }
`;

export const useOrderItemsPreveiwData = (
  previews: PreviewType<OrderItemSearchFilter>[],
  defaultFilter: OrderItemSearchFilter = {},
): PreviewDataResult => {
  const [result, setResult] = useState({});

  const {refetch} = useQuery<
    {searchMeSellerOrderItemsCount: number},
    {searchFilter: OrderItemSearchFilter}
  >(GET_ORDER_ITEMS_COUNT);

  const getPreviewData = async () => {
    /** 최근 3개월에 해당하는 주문건을 보여주기 위함 */
    const merchantUidMt = dayjs()
      .add(-3, 'month')
      .format('YYMMDD0000000000000');

    await Promise.all(
      previews.map(async ({name, filter}) => {
        const {data} = await refetch({
          searchFilter: {
            merchantUidMt,
            ...defaultFilter,
            ...filter,
            /** status 필터가 있는 경우 statusIn은 무시된다. */
            ...(filter.status ? {statusIn: undefined} : {}),
          },
        });
        const count = data?.searchMeSellerOrderItemsCount;

        setResult((prevResult) => ({
          ...prevResult,
          [name]: count,
        }));
      }),
    );

    setResult((prevResult) => ({
      ...prevResult,
      lastUpdatedAt: new Date(),
    }));
  };

  useEffect(() => {
    getPreviewData();
  }, []);

  return {data: result, reload: getPreviewData};
};
