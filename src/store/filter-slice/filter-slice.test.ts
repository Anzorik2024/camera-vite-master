import { initialStateFilter, filterReducer } from './filter-slice';
import { UNKNOWN_ACTION } from '../../utils/mock';
import { FilterData } from '../../types/filter';
import { setCurrentFilterCategory, setCurrentFilterTypes, setCurrentFilterLevels,
  setBottomPrice, setTopPrice, resetFilters} from './filter-slice';
import { FilterByCategory } from '../../const/filter-by-category';
import { FilterByType } from '../../const/filter-by-type';
import { FilterByLevel } from '../../const/filter-by-level';

describe('Reducer: filter', () => {
  let state: FilterData;

  beforeEach(() => {
    state = initialStateFilter;
  });
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update filter category if dispatch setCurrentFilterCategory', () => {
    expect(filterReducer(state, {type: setCurrentFilterCategory.type, payload: FilterByCategory.Photocamera}))
      .toEqual({...state, currentFilterCategory: FilterByCategory.Photocamera });
  });

  it('should update filter type if dispatch setCurrentFilterTypes', () => {
    expect(filterReducer(state, {type: setCurrentFilterTypes.type, payload: FilterByType.Collection}))
      .toEqual({...state, currentFilterTypes: [FilterByType.Collection] });
  });
  it('should update filter level if dispatch setCurrentFilterLevels', () => {
    expect(filterReducer(state, {type: setCurrentFilterLevels.type, payload: FilterByLevel.NonProfessional}))
      .toEqual({...state, currentFilterLevels: [FilterByLevel.NonProfessional]});
  });

  it('should update bottomPrice if dispatch setBottomPrice', () => {
    expect(filterReducer(state, {type: setBottomPrice.type, payload: 100}))
      .toEqual({...state, bottomPrice: 100});
  });
  it('should update topPrice if dispatch setTopPrice', () => {
    expect(filterReducer(state, {type: setTopPrice.type, payload: 200}))
      .toEqual({...state, topPrice: 200});
  });
  it('should reset state', () => {
    expect(filterReducer({...state,
      currentFilterCategory: FilterByCategory.Photocamera,
      currentFilterLevels: [FilterByLevel.Professional],
      currentFilterTypes: [FilterByType.Collection],
    }, resetFilters()))
      .toEqual(state);
  });
});
