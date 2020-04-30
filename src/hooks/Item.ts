import {useAxiosQuery} from './Api';
import ItemService from '@src/lib/services/Item';
import {ItemOptionsResponse} from '@src/types';
export const useItemOptions = useAxiosQuery<ItemOptionsResponse>(
  ItemService.getOptions,
);
