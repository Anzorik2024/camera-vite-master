import { createSlice } from '@reduxjs/toolkit';

import { fetchAllCameraAction } from '../thunks/catalog-process/catalog-process';
import { Cameras } from '../../types/camera';


 type InitialState = {
  cameras: Cameras | [];
  isLoading: boolean;
};

const initialState : InitialState = {
  cameras: [],
  isLoading: false,
};


const catalogSlice = createSlice({
  name: 'Catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCameraAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCameraAction.fulfilled, (state, action) => {
        state.cameras = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchAllCameraAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

const catalogReducer = catalogSlice.reducer;

const catalogReducerAction = {
  fetchAllCameraAction,
};

export { catalogReducer, catalogReducerAction, initialState };
