import {useAxiosQuery} from './Api';
import ItemService from '@src/lib/services/Item';
import {ItemOptionsResponse, ItemDiscount} from '@src/types';

export const useItemOptions = useAxiosQuery<ItemOptionsResponse>(
  ItemService.getOptions,
);

export const useItemDiscountsList = useAxiosQuery<ItemDiscount[]>(
  ItemService.discountsList,
);
