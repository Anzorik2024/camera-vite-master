import { ChangeEvent, useEffect, useCallback} from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppSelector } from '../../hooks/use-app-selector';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { changeSortOrder, changeSortType } from '../../store/sort-slice/sort-slice';

import { getCurrentSortType, getCurrentSortOrder } from '../../store/selectors';
import { SortByOrderValue, SORT_BY_ORDER } from '../../const/sort-by-order';
import { SortByTypeValue, SORT_BY_TYPE } from '../../const/sort-by-type';

import { QueryKey } from '../../const/query-key';

import '../sort/sort.css';

type ParamsType = [QueryKey.SortType, SortByTypeValue];
type ParamsOrder = [QueryKey.SortOrder, SortByOrderValue];

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();


  const currentSortByType = useAppSelector(getCurrentSortType);
  const currentSortByOrder = useAppSelector(getCurrentSortOrder);

  const updateSearchParams = useCallback((typeParams: ParamsType, orderParams: ParamsOrder) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(...typeParams);
    newSearchParams.set(...orderParams);

    setSearchParams(newSearchParams);
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    updateSearchParams ([QueryKey.SortType, currentSortByType], [QueryKey.SortOrder, currentSortByOrder]);
  },[currentSortByType,currentSortByOrder,updateSearchParams]);

  const handleInputSortTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    const selectedSortByType = element.dataset.value as SortByTypeValue;
    dispatch(changeSortType(selectedSortByType));
    if (selectedSortByType) {
      updateSearchParams ([QueryKey.SortType, selectedSortByType], [QueryKey.SortOrder, currentSortByOrder]);
    }

  };

  const handleInputSortOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;

    const selectedSortByOrder = element.dataset.value as SortByOrderValue;
    dispatch(changeSortOrder(selectedSortByOrder));
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {SORT_BY_TYPE.map(({ title, id, value }) => (
              <div className="catalog-sort__btn-text" key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort"
                  data-value={value}
                  checked={value === currentSortByType}
                  onChange={handleInputSortTypeChange}
                />
                <label htmlFor={id}>{title}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {SORT_BY_ORDER.map(({ title, id, value }) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${id}`} key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort-icon"
                  aria-label={title}
                  data-value={value}
                  checked={value === currentSortByOrder}
                  onChange={handleInputSortOrderChange}
                />
                <label htmlFor={id}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export default Sort;
