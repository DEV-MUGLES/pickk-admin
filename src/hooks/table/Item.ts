import {useAxiosQuery} from '../Api';
import ItemService from '@src/lib/services/Item';
import {Item} from '@src/types/Item';

export const useItemTable = useAxiosQuery<Item>(ItemService.getItemList);
