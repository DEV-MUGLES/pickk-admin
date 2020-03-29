import ItemService from '@src/lib/services/Item';

export const itemActions = [
  {
    text: '재고관리 ON',
    onClick: async (ids: number[]) => {
      await ItemService.manageStock(true, ids);
      return Promise.resolve(true);
    },
  },
  {
    text: '재고관리 OFF',
    onClick: async (ids: number[]) => {
      await ItemService.manageStock(false, ids);
      return Promise.resolve(true);
    },
  },
  /*{
    text: '구독 할인 설정',
    onClick: (nums: number[]) => {
      return;
    },
  },*/
];
