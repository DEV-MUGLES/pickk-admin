import {useAxiosQuery} from '../Api';
import ItemService from '@src/lib/services/Item';
import Item from 'antd/lib/list/Item';

export const useItemTable = useAxiosQuery<Item>(ItemService.getItemList);
