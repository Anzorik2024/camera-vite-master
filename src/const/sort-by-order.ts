enum SortByuOrderTitle {
  OrderUp = 'По возрастанию',
  OrderDown = 'По убыванию'
}

enum SortByOrderID {
  OrderUp = 'up',
  OrderDown = 'down'
}

export enum SortByOrderServerValue {
  OrderUp= 'asc',
  OrderDown='desc'
}

export const SORT_BY_ORDER = [
  {title: SortByuOrderTitle.OrderUp, id: SortByOrderID.OrderUp, value: SortByOrderServerValue.OrderUp},
  {title: SortByOrderID.OrderUp, id: SortByOrderID.OrderDown, value: SortByOrderServerValue.OrderDown},
];
