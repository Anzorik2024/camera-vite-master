import { ChangeEvent } from 'react';

import { SortByOrderServerValue, SORT_BY_ORDER } from '../../const/sort-by-order';
import { SortByTypeServerValue, SORT_BY_TYPE } from '../../const/sort-by-type';


function Sort(): JSX.Element {

  // const currentSortByType = useAppSelector(getCurrentSortType);
  // const currentSortByOrder = useAppSelector(getCurrentSortOrder);

  const currentSortByType = SortByTypeServerValue.Popular;
  const currentSortByOrder = SortByOrderServerValue.OrderUp;


  const handleInputSortTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;
    const selectedSortByType = element.dataset.value as SortByTypeServerValue;


    //currentSortByType = selectedSortByType;
    console.log(selectedSortByType);
  };

  const handleInputSortOrderChange = (event: ChangeEvent<HTMLInputElement>) => {
    const element = event.target;

    const selectedSortByOrder = element.dataset.value as SortByOrderServerValue;
    console.log(selectedSortByOrder);
  };

  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {SORT_BY_TYPE.map(({title, id, value}) => (
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
            {SORT_BY_ORDER.map(({title, id, value}) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${id}`} key={id}>
                <input
                  type="radio"
                  id={id}
                  name="sort-icon"
                  aria-label={title}
                  data-value={value}
                  checked={value === currentSortByOrder}
                  onChange={handleInputSortOrderChange}
                />{' '}
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
