import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterData, UserInput } from '../../types/filter';


export const initialStateFilter: FilterData = {
  currentFilterCategory: null,
  currentFilterTypes: [],
  currentFilterLevels: [],
  bottomPrice: '',
  topPrice: '',
  minPrice: 0,
  maxPrice: 0,
};

export const filterSlice = createSlice({
  name: 'Filter',
  initialState: initialStateFilter,
  reducers: {
    setCurrentFilterCategory: (state, action: PayloadAction<string | null>) => {
      state.currentFilterCategory = action.payload;
    },
    setCurrentFilterTypes: (state, action: PayloadAction<string>) => {
      state.currentFilterTypes = [...state.currentFilterTypes, action.payload];
    },
    removeCurrentFilterType: (state, action: PayloadAction<string>) => {
      state.currentFilterTypes = state.currentFilterTypes.filter(
        (type) => type !== action.payload
      );
    },
    setCurrentFilterLevels: (state, action: PayloadAction<string>) => {
      state.currentFilterLevels = [...state.currentFilterLevels, action.payload];
    },
    removeCurrentFilterLevels: (state, action: PayloadAction<string>) => {
      state.currentFilterLevels = state.currentFilterLevels.filter(
        (type) => type !== action.payload
      );
    },
    setBottomPrice: (state, action: PayloadAction<UserInput>) => {
      state.bottomPrice = action.payload;
    },
    setTopPrice: (state, action: PayloadAction<UserInput>) => {
      state.topPrice = action.payload;
    },
    setMinPrice: (state, action: PayloadAction<number>) => {
      state.minPrice = action.payload;
    },
    setMaxPrice: (state, action: PayloadAction<number>) => {
      state.maxPrice = action.payload;
    },
    resetFilters: (state) => {
      state.currentFilterCategory = null;
      state.currentFilterTypes = [];
      state.currentFilterLevels = [];
    },
  },
});

const {setCurrentFilterCategory,
  setCurrentFilterTypes,
  setCurrentFilterLevels,
  resetFilters,
  setBottomPrice,
  setTopPrice,
  setMinPrice,
  setMaxPrice,
  removeCurrentFilterType,
  removeCurrentFilterLevels,
} = filterSlice.actions;

const filterReducer = filterSlice.reducer;

export {
  setCurrentFilterCategory,
  setCurrentFilterTypes,
  setCurrentFilterLevels,
  resetFilters,
  setBottomPrice,
  setTopPrice,
  filterReducer,
  setMinPrice,
  setMaxPrice,
  removeCurrentFilterType,
  removeCurrentFilterLevels,
};
