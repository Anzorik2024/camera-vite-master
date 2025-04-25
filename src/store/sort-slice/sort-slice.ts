import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortByTypeValue } from '../../const/sort-by-type';
import { SortByOrderServerValue } from '../../const/sort-by-order';

type SortData = {
  currentSortType: SortByTypeValue;
  currentSortOrder: SortByOrderServerValue;
}

export const initialStateSort: SortData = {
  currentSortType: SortByTypeValue.Price,
  currentSortOrder: SortByOrderServerValue.OrderUp
};

export const sortSlice = createSlice({
  name: 'Sort',
  initialState: initialStateSort,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortByTypeValue>) => {
      state.currentSortType = action.payload;
    },
    changeSortOrder: (state, action: PayloadAction<SortByOrderServerValue>) => {
      state.currentSortOrder = action.payload;
    }
  }
});

const {changeSortOrder, changeSortType} = sortSlice.actions;
const sortReducer = sortSlice.reducer;

export {
  changeSortOrder,
  changeSortType,
  sortReducer
};
