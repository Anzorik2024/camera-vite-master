import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state/state';
import { Reviews, ReviewsAdapt } from '../types/camera';

import { adaptReview } from '../utils/adapt-review';
import { sortReviewByTime } from '../utils/sort-compare';


const selectCameras = (state: State) => state.catalog.cameras;
const selectIsLoading = (state: State) => state.catalog.isLoading;
const selectProductCamera = (state: State) => state.product.camera;
const selectCameraReviews = (state: State) => state.product.reviews;
const selectProductStatus = (state: State) => state.product.status;
const selectOrderStatus = (state: State) => state.order.status;


const getSelectCamera = (state: State) => state.order.selectedCamera;
const getSelectPhoneOrder = (state: State) => state.order.tel;

const selectAdaptedReviews = createSelector(selectCameraReviews, (reviews: Reviews) => reviews.map(adaptReview));
const selectSortedReviews = createSelector(selectAdaptedReviews, (reviews: ReviewsAdapt) => reviews.sort(sortReviewByTime));

export {
  selectCameras,
  selectIsLoading,
  selectProductStatus,
  selectProductCamera,
  selectCameraReviews,
  selectSortedReviews,
  getSelectCamera,
  getSelectPhoneOrder,
  selectOrderStatus
};
