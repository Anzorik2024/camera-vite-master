import { datatype, commerce, image, internet, lorem, phone } from 'faker';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import { Camera, Review } from '../types/camera';
import { State } from '../types/state/state';
import { createAPI } from '../services/api';
import { Order } from '../types/order';


const makeFakeCamera = (): Camera => ({
  id: datatype.number(),
  name: commerce.productName(),
  vendorCode: datatype.string(),
  type: commerce.product(),
  category: datatype.string(),
  description: lorem.paragraph(),
  level: datatype.string(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  price: datatype.number(),
  previewImg: image.imageUrl(),
  previewImg2x: image.imageUrl(),
  previewImgWebp: image.imageUrl(),
  previewImgWebp2x: image.imageUrl(),
  reviewCount: datatype.number(),
});


export const api = createAPI();
export const mockApi = new MockAdapter(api);
export const fakeCamera = makeFakeCamera();
export const fakeCameras = Array.from({length: 20}, makeFakeCamera);
export const middlewares = [thunk.withExtraArgument(api)];

export const mockStore = configureMockStore<
State,
Action<string>,
ThunkDispatch<State, typeof api, Action>
>(middlewares);

export const fakeId = '5';

export const makeFakeReview = (): Review => ({
  id: datatype.string(),
  userName: internet.userName(),
  advantage: lorem.sentence(),
  disadvantage: lorem.sentence(),
  review: lorem.paragraph(),
  rating: datatype.number({ min: 1, max: 5, precision: 0.01 }),
  cameraId: datatype.number(),
  createAt: datatype.string(),
});

export const fakeReview = makeFakeReview();

export const fakeReviews = Array.from({length: 15}, makeFakeReview);

export const makeFakeOrder = (): Order => ({
  camerasIds: [datatype.number({ min: 1, max: 100 })],
  coupon: null,
  tel: phone.phoneNumber(),
});


export const fakeOrder = makeFakeOrder();
export const UNKNOWN_ACTION = {type: 'UNKNOWN_ACTION'};

export const fakePhoneNumber = phone.phoneNumber();

