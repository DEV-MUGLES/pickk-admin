import {useAxiosQuery} from '../Api';
import ItemService from '@src/lib/services/Item';
import {Item, ItemSubsDiscountRateInfo, IProduct} from '@src/types';

export const useItemTable = useAxiosQuery<Item[]>(ItemService.getList);

export const useProductList = useAxiosQuery<IProduct[]>(
  ItemService.getProductList,
);

export const useDiscountList = useAxiosQuery<ItemSubsDiscountRateInfo[]>(
  ItemService.getItemDiscountRateList,
);
