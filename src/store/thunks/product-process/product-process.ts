import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { ApiRoute } from '../../../const/api-route';
import { Camera } from '../../../types/camera';
import { Reviews } from '../../../types/camera';
import { Order } from '../../../types/order';

export const fetchCameraByIdAction = createAsyncThunk<
Camera,
string,
{
  extra: AxiosInstance;
}
>('product/fetchCameraById',
  async (id, { extra: api}) => {
    const { data } = await api.get<Camera>(`${ApiRoute.Cameras}/${id}`);

    return data;
  }
);

export const fetchCameraReviews = createAsyncThunk<
Reviews,
string,
{
  extra: AxiosInstance;
}
>('product/fetchCameraReviews',
  async (id, { extra: api}) => {
    const { data } = await api.get<Reviews>(`${ApiRoute.Cameras}/${id}/reviews`);

    return data;
  }
);

export const sendOrderAction = createAsyncThunk<
void,
Order,
{
  extra: AxiosInstance;
}
>('order/sendOrder',
  async (userOrder, {extra: api}) => {
    await api.post<Order>(ApiRoute.Order, userOrder);
  }
);
