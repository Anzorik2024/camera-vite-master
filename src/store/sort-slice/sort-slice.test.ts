import { changeSortOrder, changeSortType, initialStateSort, sortReducer} from './sort-slice';

import { SortByTypeValue } from '../../const/sort-by-type';
import { UNKNOWN_ACTION } from '../../utils/mock';
import { SortByOrderValue } from '../../const/sort-by-order';
import { SortData } from '../../types/sort';
describe('Reducer: sort', () => {
  let state: SortData;

  beforeEach(() => {
    state = initialStateSort;
  });
  it('without additional parameters should return initial state', () => {
    expect(sortReducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update sort type if dispatch changeSortType', () => {
    expect(sortReducer(state, {type: changeSortType.type, payload: SortByTypeValue.Popular}))
      .toEqual({...state, currentSortType: SortByTypeValue.Popular });
  });
  it('should update sort order if dispatch changeSortOrder', () => {
    expect(sortReducer(state, {type: changeSortOrder.type, payload: SortByOrderValue.OrderDown}))
      .toEqual({...state, currentSortOrder: SortByOrderValue.OrderDown });
  });
});
