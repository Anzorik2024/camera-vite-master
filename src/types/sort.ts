import { SortByOrderValue } from '../const/sort-by-order';
import { SortByTypeValue } from '../const/sort-by-type';

export type SortData = {
  currentSortType: SortByTypeValue;
  currentSortOrder: SortByOrderValue;
};
