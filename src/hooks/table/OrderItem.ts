import {useAxiosQuery} from '../Api';
import OrderItemService from '@src/lib/services/OrderItem';
import {OrderItem} from '@src/types';

export const useOrderItemTable = useAxiosQuery<OrderItem[]>(
  OrderItemService.getList,
);
