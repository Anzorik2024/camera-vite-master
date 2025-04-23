import {useEffect, useState, ChangeEvent, KeyboardEvent} from 'react';

import FilterByPrice from '../filter-by-price/filter-by-price';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { UserInput } from '../../types/filter';

import { FilterByCategory } from '../../const/filter-by-category';
import { getCurrentFilterByCategory, getCurrentFiltersByTypes, getCurrentFiltersByLevels, selectCameras } from '../../store/selectors';
import { QueryKey } from '../../const/query-key';
import { FilterByType } from '../../const/filter-by-type';
import { FilterByLevel } from '../../const/filter-by-level';
import { usePriceRange } from '../../hooks/use-price-range';

import { resetFilters,
  setCurrentFilterLevels,
  setCurrentFilterCategory,
  setCurrentFilterTypes,
  removeCurrentFilterType,
  removeCurrentFilterLevels,
} from '../../store/filter-slice/filter-slice';

import '../filters/filters.css';

function Filters(): JSX.Element {

  const dispatch = useAppDispatch();
  const currentFilterByCategory = useAppSelector(getCurrentFilterByCategory);
  const currentFiltersByType = useAppSelector(getCurrentFiltersByTypes);
  const currentFiltersByLevels = useAppSelector(getCurrentFiltersByLevels);

  //////////////////////////////////////////////////////////////
  const camerasCatalog = useAppSelector(selectCameras);// Заменить на фильтрованные данные

  // const currentMinPriceValue = usePriceRange(camerasCatalog).minPrice;
  // dispatch(setBottomPrice(currentMinPriceValue));

  // useEffect(() => {// вынести в отдельный компонент!!!
  //   dispatch(setTopPrice(currentMaxPrice2));// тестирую для фильтрации!!!
  //   dispatch(setBottomPrice(currentMinPriceValue));// тестирую для фильтрации!!!
  // },[currentMaxPrice2,currentMinPriceValue,dispatch]);

  //////////////////////////////////////////////////////////////////

  const isVideocamera = currentFilterByCategory === FilterByCategory.Videocamera;
  const isChecked = (filter: string, filtres: string[]) => filtres.some((value) => value === filter);

  const [bottomPriceValue, setBottomPriceValue] = useState<UserInput>('');
  const [topPriceValue, setTopPriceValue] = useState<UserInput>('');

  const handleCatalogFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {// переделать название под общее!!! добавить изменение под типы
    const filterInput = event.target;
    const queryKey = filterInput.dataset.query as QueryKey;
    const value = filterInput.dataset.value as string;

    switch(queryKey) {
      case QueryKey.FilterCategory: {
        if (value) {
          if(value === FilterByCategory.Videocamera) {
            if (currentFiltersByType.some((filter) => filter === FilterByType.Film)) {
              dispatch(removeCurrentFilterType(FilterByType.Film));//убираю тип камеры
            }
            if (currentFiltersByType.some((filter) => filter === FilterByType.Snapshot)) {
              dispatch(removeCurrentFilterType(FilterByType.Snapshot));//убираю тип камеры
            }
          }
          dispatch(setCurrentFilterCategory(value));// тут убирать при смене категории тип камеры!!!
        }
        break;
      }

      case QueryKey.FilterType: {
        if (value && !currentFiltersByType.some((filter) => filter === value)) {
          dispatch(setCurrentFilterTypes(value));
        }
        if (value && currentFiltersByType.some((filter) => filter === value)) {
          dispatch(removeCurrentFilterType(value));
        }
        break;
      }

      case QueryKey.FilterLevel: {
        if (value && !currentFiltersByLevels.some((filter) => filter === value)) {
          dispatch(setCurrentFilterLevels(value));
        }
        if (value && currentFiltersByLevels.some((filter) => filter === value)) {
          dispatch(removeCurrentFilterLevels(value));
        }
        break;
      }
    }
  };

  const handleCategoryInputKeyDown = (event: KeyboardEvent) => {// скорее всего убрать обаботчик - решается стрелками!!!
    const radioInput = event.target as HTMLInputElement;
    const value = radioInput.dataset.value as string;
    if (event.key === 'Enter') {
      if (value) {
        dispatch(setCurrentFilterCategory(value));
      }
    }
  };


  const handleFormReset = (event: React.FormEvent) => {
    event.preventDefault(); // оказалось удачное решение!!!
    setBottomPriceValue('');
    setTopPriceValue('');
    dispatch(resetFilters());// доработать сброс цены
  };


  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#" onReset={handleFormReset}>
          <h2 className="visually-hidden">Фильтр</h2>
          <FilterByPrice
            bottomPrice={bottomPriceValue}
            topPrice={topPriceValue}
            onBottomPriceChange={setBottomPriceValue}
            onTopPriceChange={setTopPriceValue}
          />
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            {Object.entries(FilterByCategory).map(([name, category]) => (
              <div className="custom-radio catalog-filter__item" key={name}>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value={name[0].toLowerCase().concat(name.slice(1))}
                    checked={category === currentFilterByCategory}
                    data-value={category}
                    data-query={QueryKey.FilterCategory}
                    onChange={handleCatalogFilterInputChange}
                    onKeyDown={handleCategoryInputKeyDown}
                  />
                  <span className="custom-radio__icon">
                  </span>
                  <span className="custom-radio__label">
                    {category}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            {Object.entries(FilterByType).map(([name, type]) => {
              const isDisabled = (type === FilterByType.Snapshot || type === FilterByType.Film) && isVideocamera;
              return (
                <div className="custom-checkbox catalog-filter__item" key={name} >
                  <label>
                    <input
                      type="checkbox"
                      name={name[0].toLowerCase().concat(name.slice(1))}
                      checked={isChecked(type, currentFiltersByType)}
                      disabled={isDisabled}
                      data-query={QueryKey.FilterType}
                      data-value={type}
                      onChange={handleCatalogFilterInputChange}// переделать название под общее, сделать изменение значения
                    />
                    <span className="custom-checkbox__icon" />
                    <span className="custom-checkbox__label">
                      {type}
                    </span>
                  </label>
                </div>
              );
            })}
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            {Object.entries(FilterByLevel).map(([name, level]) => (
              <div className="custom-checkbox catalog-filter__item" key={name}>
                <label>
                  <input
                    type="checkbox"
                    name={level === FilterByLevel.NonProfessional ? 'non-professional' : name[0].toLowerCase().concat(name.slice(1))}
                    checked={isChecked(level, currentFiltersByLevels)}
                    data-query={QueryKey.FilterLevel}
                    data-value={level}
                    onChange={handleCatalogFilterInputChange}// переделать название под общее, сделать изменение значения
                  />
                  <span className="custom-checkbox__icon" />
                  <span className="custom-checkbox__label">
                    {level}
                  </span>
                </label>
              </div>
            ))}
          </fieldset>
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Filters;
