import { initialState, productDataReducer } from './product-slice';
import { fetchCameraByIdAction, fetchCameraReviews } from '../thunks/product-process/product-process';
import { fakeCamera, fakeReviews } from '../../utils/mock';


import { Camera, Reviews } from '../../types/camera';
import { RequestStatus } from '../../const/request-status';
import { UNKNOWN_ACTION } from '../../utils/mock';


type initialStateProduct = {
  camera: Camera | null ;
  reviews: Reviews | [];
  status: RequestStatus;
};
describe('Reducer: catalogData', () => {
  let state: initialStateProduct;

  beforeEach(() => {
    state = initialState;
  });
  it('without additional parameters should return initial state', () => {
    expect(productDataReducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update camera and change  status if fetchCameraByIdAction fulfiled', () => {
    expect(productDataReducer(state, {type: fetchCameraByIdAction.fulfilled.type, payload: fakeCamera}))
      .toEqual({...state, camera: fakeCamera, status: RequestStatus.Success});
  });
  it('should change status to Loading if camera fetchCameraByIdAction pending', () => {
    expect(productDataReducer(state, {type: fetchCameraByIdAction.pending.type}))
      .toEqual({...state, status: RequestStatus.Loading });
  });
  it('should change status to Failed if fetchCameraByIdAction rejected', () => {
    expect(productDataReducer(state, {type: fetchCameraByIdAction.rejected.type}))
      .toEqual({...state, status: RequestStatus.Failed});
  });
  it('should update reviews and change  status if fetchCameraReviews fulfiled', () => {
    expect(productDataReducer(state, {type: fetchCameraReviews.fulfilled.type, payload: fakeReviews}))
      .toEqual({...state, reviews: fakeReviews, status: RequestStatus.Success});
  });
  it('should change status to Loading if reviews fetchCameraReviews pending', () => {
    expect(productDataReducer(state, {type: fetchCameraReviews.pending.type}))
      .toEqual({...state, status: RequestStatus.Loading });
  });
  it('should change status  to Failed if fetchCameraReviews rejected', () => {
    expect(productDataReducer(state, {type: fetchCameraReviews.rejected.type}))
      .toEqual({...state, status: RequestStatus.Failed});
  });
});

