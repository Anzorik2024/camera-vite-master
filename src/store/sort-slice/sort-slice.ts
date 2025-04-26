import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortByTypeValue } from '../../const/sort-by-type';
import { SortByOrderValue } from '../../const/sort-by-order';

import { SortData } from '../../types/sort';

export const initialStateSort: SortData = {
  currentSortType: null,
  currentSortOrder: null
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
    },
    resetSortType: (state) => {
      state.currentSortType = null;
    },
    resetSortOrder: (state) => {
      state.currentSortOrder = null;
    }
  }
});

const {changeSortOrder, changeSortType,resetSortType, resetSortOrder} = sortSlice.actions;
const sortReducer = sortSlice.reducer;

export {
  changeSortOrder,
  changeSortType,
  sortReducer,
  resetSortType,
  resetSortOrder
};
