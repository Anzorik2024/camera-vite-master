import { createSlice } from '@reduxjs/toolkit';
import { Camera, Reviews } from '../../types/camera';
import { fetchCameraByIdAction } from '../thunks/product-process/product-process';
import { fetchCameraReviews } from '../thunks/product-process/product-process';

import { RequestStatus } from '../../const/request-status';


type initialStateProduct = {
  camera: Camera | null ;
  reviews: Reviews | [];
  status: RequestStatus;
};

const initialState: initialStateProduct = {
  camera: null,
  reviews: [],
  status: RequestStatus.Idle
};


export const productData = createSlice({
  initialState,
  name: 'Product',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCameraByIdAction.fulfilled, (state, action) => {
      state.camera = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchCameraByIdAction.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchCameraByIdAction.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
    builder.addCase(fetchCameraReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.status = RequestStatus.Success;
    });
    builder.addCase(fetchCameraReviews.rejected, (state) => {
      state.status = RequestStatus.Failed;
    });
    builder.addCase(fetchCameraReviews.pending, (state) => {
      state.status = RequestStatus.Loading;
    });
  },
});

const productDataActions = {
  fetchCameraByIdAction,
  fetchCameraReviews
};

const productDataReducer = productData.reducer;

export {
  productDataActions,
  productDataReducer,
  initialState
};

