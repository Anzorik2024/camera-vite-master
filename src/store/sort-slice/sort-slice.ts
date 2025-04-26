import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortByTypeValue } from '../../const/sort-by-type';
import { SortByOrderValue } from '../../const/sort-by-order';

import { SortData } from '../../types/sort';

export const initialStateSort: SortData = {
  currentSortType: SortByTypeValue.Price,
  currentSortOrder:  SortByOrderValue.OrderUp
};

export const sortSlice = createSlice({
  name: 'Sort',
  initialState: initialStateSort,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortByTypeValue>) => {
      state.currentSortType = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<SortByOrderValue>) => {
      state.currentSortOrder = action.payload;
    }
  }
});

const {changeSortOrder, changeSortType} = sortSlice.actions;
const sortReducer = sortSlice.reducer;

export {
  changeSortOrder,
  changeSortType,
  sortReducer,
};
