import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useAppDispatch } from '../hooks/use-app-dispatch';
import {useAppSelector} from '../hooks/use-app-selector';

import { QueryKey } from '../const/query-key';

import { getCurrentFilterByCategory,getCurrentFiltersByTypes, } from '../store/selectors';
import { setCurrentFilterCategory, removeCurrentFilterType, setCurrentFilterTypes, resetCurrentFilterGroup } from '../store/filter-slice/filter-slice';
import { FilterByCategory } from '../const/filter-by-category';
import { FilterByType } from '../const/filter-by-type';


const useCheckSearchParams = () => {
  const dispatch = useAppDispatch();
  const currentFilterCategory = useAppSelector(getCurrentFilterByCategory);
  const currentFiltersByType = useAppSelector(getCurrentFiltersByTypes);
  // const currentFilterLevels = useAppSelector(getCurrentFiltersByLevels);
  // const currentSortType = useAppSelector(getCurrentSortType);
  // const currentSortOrder = useAppSelector(getCurrentSortOrder);
  // const currentBottomPrice = useAppSelector(getUserEnteredTopPrice);
  // const currentTopPrice = useAppSelector(getUserEnteredBottomPrice);

  const [searchParams] = useSearchParams();

  useEffect (() => {
    const isQueryParamExists = (param: QueryKey) => searchParams && searchParams.has(param);

    // if(isQueryParamExists(QueryKey.SortType)) {
    //   const paramsSortType = searchParams.get(QueryKey.SortType) as SortByTypeServerValue;
    //   const isAlreadySelected = currentSortType === paramsSortType;


    //   if(!isAlreadySelected) {
    //     dispatch(changeSortType(paramsSortType));
    //   }
    // }

    // if(!isQueryParamExists(QueryKey.SortType) && currentSortType !== null) {
    //   dispatch(resetSortType());//делаем сброс state, когда в адресной строке уже нет query-string с ключом sort_type, а в state значение сохранилось
    // }

    // if(isQueryParamExists(QueryKey.SortOrder)) {
    //   const paramsSortOrder = searchParams.get(QueryKey.SortOrder) as SortByOrderServerValue;
    //   const isAlreadySelected = currentSortOrder === paramsSortOrder;

    //   if(!isAlreadySelected) {
    //     dispatch(changeSortOrder(paramsSortOrder));
    //   }
    // }

    // if(!isQueryParamExists(QueryKey.SortOrder) && currentSortOrder !== null) {
    //   dispatch(resetSortOrder());
    // }

    // if(isQueryParamExists(QueryKey.BottomPrice)) {
    //   const paramsPriceFrom = searchParams.get(QueryKey.BottomPrice) as UserInput;
    //   const isAlreadySelected = currentTopPrice === paramsPriceFrom;

    //   if(!isAlreadySelected) {
    //     dispatch(setBottomPrice(paramsPriceFrom));
    //   }
    // }

    // if(!isQueryParamExists(QueryKey.BottomPrice) && Number(currentBottomPrice) !== 0) {
    //   dispatch(setBottomPrice(''));
    // }

    // if(isQueryParamExists(QueryKey.TopPrice)) {
    //   const paramsPriceTo = searchParams.get(QueryKey.TopPrice) as UserInput;
    //   const isAlreadySelected = currentBottomPrice === paramsPriceTo;

    //   if(!isAlreadySelected) {
    //     dispatch(setTopPrice(paramsPriceTo));
    //   }
    // }

    // if(!isQueryParamExists(QueryKey.TopPrice) && Number(currentTopPrice) !== 0) {
    //   dispatch(setTopPrice(''));
    // }

    if(isQueryParamExists(QueryKey.FilterCategory)) {
      const paramsCategory = searchParams.get(QueryKey.FilterCategory) as string;
      const isAlreadySelected = currentFilterCategory === paramsCategory;

      if (!isAlreadySelected) {
        if(paramsCategory === FilterByCategory.Videocamera) {
          if (currentFiltersByType.some((filter) => filter === FilterByType.Film)) {
            dispatch(removeCurrentFilterType(FilterByType.Film));

          }
          if (currentFiltersByType.some((filter) => filter === FilterByType.Snapshot)) {
            dispatch(removeCurrentFilterType(FilterByType.Snapshot));
          }
        }
        dispatch(setCurrentFilterCategory(paramsCategory));
      }
    }

    if(!isQueryParamExists(QueryKey.FilterCategory) && currentFilterCategory !== null) {
      dispatch(resetCurrentFilterGroup(QueryKey.FilterCategory));
    }

    if(isQueryParamExists(QueryKey.FilterType)) {
      const paramsType = searchParams.getAll(QueryKey.FilterType);
      paramsType.forEach((value) => {
        const isAlreadySelected = currentFiltersByType.some((type) => type === value);

        if (!isAlreadySelected) {
          dispatch(setCurrentFilterTypes(value));
        }
      });
    }

    if(!isQueryParamExists(QueryKey.FilterType) && currentFiltersByType.length !== 0) {// обязательно добавить!!!
      dispatch(resetCurrentFilterGroup(QueryKey.FilterType));
    }

    // if(isQueryParamExists(QueryKey.FilterLevel)) {
    //   const paramsLevel = searchParams.getAll(QueryKey.FilterLevel);
    //   paramsLevel.forEach((value) => {
    //     const isAlreadySelected = currentFilterLevels.some((level) => level === value);

    //     if (!isAlreadySelected) {
    //       dispatch(setCurrentFilterLevels(value));
    //     }
    //   });
    // }

    // if(!isQueryParamExists(QueryKey.FilterLevel) && currentFilterLevels.length !== 0) {
    //   dispatch(resetCurrentFilterGroup(QueryKey.FilterLevel));
    // }

  },[dispatch, searchParams, currentFilterCategory,currentFiltersByType]);
};

export default useCheckSearchParams;
