import {useAxiosQuery} from '../Api';
import ItemService from '@src/lib/services/Item';
import {Item, Product} from '@src/types';

export const useItemTable = useAxiosQuery<Item[]>(ItemService.getList);

export const useProductList = useAxiosQuery<Product[]>(
  ItemService.getProductList,
);
