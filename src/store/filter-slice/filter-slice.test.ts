import { initialStateFilter, filterReducer } from './filter-slice';
import { UNKNOWN_ACTION } from '../../utils/mock';
import { FilterData } from '../../types/filter';

describe('Reducer: filter', () => {
  let state: FilterData;

  beforeEach(() => {
    state = initialStateFilter;
  });
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
});
