import { ApiRoute } from '../../../const/api-route';
import { mockApi, fakeCamera, mockStore, fakeId, fakeReviews, fakeOrder } from '../../../utils/mock';
import { fetchCameraByIdAction, fetchCameraReviews } from './product-process';
import { sendOrderAction } from './product-process';
describe('Asynk actions: test', () => {
  it('fetchCameraById should return camera if server return 200', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}`)
      .reply(200, fakeCamera);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchCameraByIdAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCameraByIdAction.pending.type,
      fetchCameraByIdAction.fulfilled.type
    ]);

    expect(payload).toEqual(fakeCamera);
  });
  it('fetchCameraById should not return cameras if server return 400', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}`)
      .reply(400, fakeCamera);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCameraByIdAction(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCameraByIdAction.pending.type,
      fetchCameraByIdAction.rejected.type
    ]);
  });

  it('fetchCameraReviews should return reviews if server return 200', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/reviews`)
      .reply(200, fakeReviews);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    const { payload } = await store.dispatch(fetchCameraReviews(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCameraReviews.pending.type,
      fetchCameraReviews.fulfilled.type
    ]);

    expect(payload).toEqual(fakeReviews);
  });
  it('fetchCameraReviews should not return cameras if server return 400', async() => {
    mockApi
      .onGet(`${ApiRoute.Cameras}/${fakeId}/reviews`)
      .reply(400, fakeReviews);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(fetchCameraReviews(fakeId));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCameraReviews.pending.type,
      fetchCameraReviews.rejected.type
    ]);
  });

  it('sendOrderAction should send review if server return 201', async() => {
    mockApi
      .onPost(ApiRoute.Order)
      .reply(201);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendOrderAction(fakeOrder));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendOrderAction.pending.type,
      sendOrderAction.fulfilled.type
    ]);
  });

  it('sendOrderAction should handle 401 error response', async () => {
    mockApi
      .onPost(ApiRoute.Order)
      .reply(401);

    const store = mockStore();
    expect(store.getActions()).toEqual([]);

    await store.dispatch(sendOrderAction(fakeOrder));

    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      sendOrderAction.pending.type,
      sendOrderAction.rejected.type
    ]);
  });
});
