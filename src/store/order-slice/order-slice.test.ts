import { initialState, orderReducer, selectCamera, selectPhone, resetOrder } from './order-slice';
import { sendOrderAction } from '../thunks/product-process/product-process';
import { RequestStatus } from '../../const/request-status';
import { UNKNOWN_ACTION } from '../../utils/mock';
import { Camera } from '../../types/camera';
import { fakeCamera, fakePhoneNumber } from '../../utils/mock';

type InitialState = {
  selectedCamera: Camera | null;
  tel: string | null;
  status: RequestStatus;
};


describe('Reducer: catalogData', () => {
  let state: InitialState;

  beforeEach(() => {
    state = initialState;
  });
  it('without additional parameters should return initial state', () => {
    expect(orderReducer(initialState, UNKNOWN_ACTION))
      .toEqual(state);
  });

  it('should update selectedCamera if selectCamera action', () => {
    const result = orderReducer(initialState, selectCamera(fakeCamera));
    expect(result.selectedCamera).toEqual(fakeCamera);
  });

  it('should update tel if selectPhone action', () => {
    const result = orderReducer(initialState, selectPhone(fakePhoneNumber));
    expect(result.tel).toEqual(fakePhoneNumber);
  });

  it('should reset OrderData if resetOrder action', () => {
    const currentState = {
      selectedCamera: fakeCamera,
      tel: fakePhoneNumber,
      status: RequestStatus.Idle,
    };
    const result = orderReducer(currentState, resetOrder());
    expect(result).toEqual(initialState);
  });

  it('should change status to Loading if Order sendOrderAction pending', () => {
    expect(orderReducer(state, {type: sendOrderAction.pending.type}))
      .toEqual({...state, status: RequestStatus.Loading });
  });


  it('should change status to Failed if Order sendOrderAction  rejected', () => {
    expect(orderReducer(state, {type: sendOrderAction.rejected.type}))
      .toEqual({...state, status: RequestStatus.Failed});
  });

  it('should change status  to Success if Order sendOrderAction  fulfilled', () => {
    expect(orderReducer(state, {type: sendOrderAction.fulfilled.type}))
      .toEqual({...state, status: RequestStatus.Success});
  });
});


