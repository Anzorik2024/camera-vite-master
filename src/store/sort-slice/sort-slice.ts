import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { SortByTypeServerValue } from '../../const/sort-by-type';
import { SortByOrderServerValue } from '../../const/sort-by-order';

type SortData = {
  currentSortType: SortByTypeServerValue;
  currentSortOrder: SortByOrderServerValue;
}

export const initialStateSort: SortData = {
  currentSortType: SortByTypeServerValue.Price,
  currentSortOrder: SortByOrderServerValue.OrderUp
};

export const sortSlice = createSlice({
  name: 'Sort',
  initialState: initialStateSort,
  reducers: {
    changeSortType: (state, action: PayloadAction<SortByTypeServerValue>) => {
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
