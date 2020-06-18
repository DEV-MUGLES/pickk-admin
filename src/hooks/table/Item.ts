import {useAxiosQuery} from '../Api';
import ItemService from '@src/lib/services/Item';
import {Item, ItemDiscount, IProduct} from '@src/types';

export const useItemTable = useAxiosQuery<Item[]>(ItemService.getList);

export const useProductList = useAxiosQuery<IProduct[]>(
  ItemService.getProductList,
);

export const useDiscountList = useAxiosQuery<ItemDiscount[]>(
  ItemService.getItemDiscountRateList,
);
