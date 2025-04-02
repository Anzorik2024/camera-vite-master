import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { State, Dispatch } from '../../../types/state/state';
import { ApiRoute } from '../../../const/api-route';
import { Cameras } from '../../../types/camera';

export const fetchAllCameraAction = createAsyncThunk<Cameras, undefined, {dispatch: Dispatch; state: State; extra: AxiosInstance}>('catalog/fetchAllCameras', async (_arg, { extra: api}) => {
  const { data } = await api.get<Cameras>(ApiRoute.Cameras);
  return data;
});


