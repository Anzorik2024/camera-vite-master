import {useEffect, useState, ChangeEvent, KeyboardEvent} from 'react';
import { useSearchParams } from 'react-router-dom';

import FilterByPrice from '../filter-by-price/filter-by-price';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { UserInput } from '../../types/filter';

import { QueryKey } from '../../const/query-key';
import { FilterByType } from '../../const/filter-by-type';
import { FilterByLevel } from '../../const/filter-by-level';
import { usePriceRange } from '../../hooks/use-price-range';

import { FilterByCategory } from '../../const/filter-by-category';
import { getCurrentFilterByCategory, getCurrentFiltersByTypes,getUserEnteredTopPrice,
  getCurrentFiltersByLevels, selectCameras, getUserEnteredBottomPrice} from '../../store/selectors';
import { resetFilters, setCurrentFilterCategory, removeCurrentFilterType,
  removeCurrentFilterLevels,setBottomPrice,setTopPrice,setMinPrice,
  setMaxPrice} from '../../store/filter-slice/filter-slice';
import { Cameras } from '../../types/camera';

import '../filters/filters.css';


type FilterProps = {
  cameraFiltering: Cameras;
}

const excludeParams = (params: URLSearchParams, excludedValues: string[]) => {
  const cleanedParams = [...params.entries()]
    .filter(([...args]) => !excludedValues.includes(args[1]));

  return new URLSearchParams(cleanedParams);
};
function Filters({cameraFiltering} :FilterProps): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useAppDispatch();
  const currentFilterByCategory = useAppSelector(getCurrentFilterByCategory);
  const currentFiltersByType = useAppSelector(getCurrentFiltersByTypes);
  const currentFiltersByLevels = useAppSelector(getCurrentFiltersByLevels);
  const camerasCatalog = useAppSelector(selectCameras);

  const isVideocamera = currentFilterByCategory === FilterByCategory.Videocamera;
  const isChecked = (filter: string, filtres: string[]) => filtres.some((value) => value === filter);

  const [bottomPriceValue, setBottomPriceValue] = useState<UserInput>('');
  const [topPriceValue, setTopPriceValue] = useState<UserInput>('');
  const pricesFromCatalog = usePriceRange(camerasCatalog);
  const pricesFromFiltered = usePriceRange(cameraFiltering);

  const currentMaxPrice = cameraFiltering.length > 0 ? pricesFromFiltered.maxPrice : pricesFromCatalog.maxPrice;
  const currentMinPrice = cameraFiltering.length > 0 ? pricesFromFiltered.minPrice : pricesFromCatalog.minPrice;

  useEffect(() => {
    dispatch(setMinPrice(currentMinPrice));
    dispatch(setMaxPrice(currentMaxPrice));

  },[currentMaxPrice,currentMinPrice,dispatch]);

  const currentMinPriceValue = pricesFromCatalog.minPrice;
  const currentMaxPriceValue = pricesFromCatalog.maxPrice;

  const currentTopPrice = Number(useAppSelector(getUserEnteredTopPrice));
  const currentBottomPrice = Number(useAppSelector(getUserEnteredBottomPrice));

  useEffect(() => {
    if(currentTopPrice > 0 && currentTopPrice !== currentMaxPriceValue) {
      dispatch(setTopPrice(currentTopPrice));
      setTopPriceValue(currentTopPrice);
    } else {
      dispatch(setTopPrice(currentMaxPriceValue));
    }
  },[currentTopPrice, currentMaxPriceValue, dispatch]);

  useEffect(() => {
    if (currentBottomPrice > 0 && currentBottomPrice !== currentMinPriceValue) {
      dispatch(setBottomPrice(currentBottomPrice));
      setBottomPriceValue(currentBottomPrice);
    } else {
      dispatch(setBottomPrice(currentMinPriceValue));
    }
  },[currentBottomPrice, currentMinPriceValue, dispatch]);


  const addQueryParams = (key: QueryKey, value :string) => {
    const params = new URLSearchParams([...searchParams.entries(), [key, value]]);
    setSearchParams(params);
  };
  const removeQueryParams = (valuesToRemove:string) => {
    const params = excludeParams(searchParams, [valuesToRemove]);
    setSearchParams(params);
  };

  const handleCatalogFilterInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const filterInput = event.target;
    const queryKey = filterInput.dataset.query as QueryKey;
    const value = filterInput.dataset.value as string;

    switch(queryKey) {
      case QueryKey.FilterCategory: {
        if (value) {
          if(value === FilterByCategory.Videocamera) {
            const videocameraSearchParams = excludeParams(searchParams, [FilterByType.Film, FilterByType.Snapshot, FilterByCategory.Photocamera]);
            videocameraSearchParams.append(queryKey, value);
            setSearchParams(videocameraSearchParams);

            if (currentFiltersByType.some((filter) => filter === FilterByType.Film)) {
              dispatch(removeCurrentFilterType(FilterByType.Film));

            }
            if (currentFiltersByType.some((filter) => filter === FilterByType.Snapshot)) {
              dispatch(removeCurrentFilterType(FilterByType.Snapshot));
            }
          }

          if(value === FilterByCategory.Photocamera) {
            const photocameraSearchParams = excludeParams(searchParams, [FilterByCategory.Videocamera]);
            photocameraSearchParams.append(queryKey, value);
            setSearchParams(photocameraSearchParams);
          }
          dispatch(setCurrentFilterCategory(value));
        }
        break;
      }

      case QueryKey.FilterType: {
        if (value && !currentFiltersByType.some((filter) => filter === value)) {
          addQueryParams(queryKey,value);
        }
        if (value && currentFiltersByType.some((filter) => filter === value)) {
          dispatch(removeCurrentFilterType(value));
          removeQueryParams(value);
        }
        break;
      }

      case QueryKey.FilterLevel: {
        if (value && !currentFiltersByLevels.some((filter) => filter === value)) {
          addQueryParams(queryKey,value);
        }
        if (value && currentFiltersByLevels.some((filter) => filter === value)) {
          dispatch(removeCurrentFilterLevels(value));
          removeQueryParams(value);
        }
        break;
      }
    }
  };

  const handleCheckboxKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      const checkbox = event.target as HTMLInputElement;
      checkbox.click();
    }
  };


  const deleteSearchParams = () => {
    Object.values(QueryKey).forEach((key) => {
      if(key === QueryKey.SortOrder || key === QueryKey.SortType) {
        return;
      }

      searchParams.delete(key);
    });
    setSearchParams(searchParams);
  };


  const handleFormReset = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(setTopPrice(currentMaxPriceValue));
    dispatch(setBottomPrice(currentMinPriceValue));
    setBottomPriceValue('');
    setTopPriceValue('');
    dispatch(resetFilters());
    deleteSearchParams();

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
                      onKeyDown={handleCheckboxKeyDown}
                      onChange={handleCatalogFilterInputChange}
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
                    onKeyDown={handleCheckboxKeyDown}
                    onChange={handleCatalogFilterInputChange}
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
