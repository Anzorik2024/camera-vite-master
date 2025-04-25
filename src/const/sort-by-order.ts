enum SortByuOrderTitle {
  OrderUp = 'По возрастанию',
  OrderDown = 'По убыванию'
}

enum SortByOrderID {
  OrderUp = 'up',
  OrderDown = 'down'
}

export enum SortByOrderValue {
  OrderUp= 'asc',
  OrderDown='desc'
}

export const SORT_BY_ORDER = [
  {title: SortByuOrderTitle.OrderUp, id: SortByOrderID.OrderUp, value: SortByOrderValue.OrderUp},
  {title: SortByOrderID.OrderUp, id: SortByOrderID.OrderDown, value: SortByOrderValue.OrderDown},
];
