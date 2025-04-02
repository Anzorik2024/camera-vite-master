import { ApiRoute } from '../../../const/api-route';
import { mockApi, fakeCameras, mockStore } from '../../../utils/mock';
import { fetchAllCameraAction } from './catalog-process';

describe('Asynk actions: test', () => {
  it('fetchAllCameraAction should return cameras if server return 200', async() => {
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(200, fakeCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchAllCameraAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAllCameraAction.pending.type,
      fetchAllCameraAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCameras);
  });
  it('fetchAllCameraAction should not return cameras if server return 400', async() => {
    mockApi
      .onGet(ApiRoute.Cameras)
      .reply(400, fakeCameras);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchAllCameraAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchAllCameraAction.pending.type,
      fetchAllCameraAction.rejected.type
    ]);
  });
});
