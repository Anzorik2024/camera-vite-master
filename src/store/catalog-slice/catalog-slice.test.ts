import { Cameras } from '../../types/camera';
import { initialState, catalogReducer} from './catalog-slice';
import { UNKNOWN_ACTION } from '../../utils/mock';
import { fetchAllCameraAction } from '../thunks/catalog-process/catalog-process';
import { fakeCameras } from '../../utils/mock';

type InitialState = {
  cameras: Cameras | [];
  isLoading: boolean;
};
describe('Reducer: catalogData', () => {
  let state: InitialState;

  beforeEach(() => {
    state = initialState;
  });
  it('without additional parameters should return initial state', () => {
    expect(catalogReducer(undefined, UNKNOWN_ACTION))
      .toEqual(state);
  });
  it('should update cameras and change loading status if fetchAllCameraAction fulfiled', () => {
    expect(catalogReducer(state, {type: fetchAllCameraAction.fulfilled.type, payload: fakeCameras}))
      .toEqual({...state, cameras: fakeCameras, isLoading: false });
  });
  it('should change loading status to true if cameras loading', () => {
    expect(catalogReducer(state, {type: fetchAllCameraAction.pending.type}))
      .toEqual({...state, isLoading: true });
  });
  it('should change loading status to false if fetchAllCameraAction rejected', () => {
    expect(catalogReducer(state, {type: fetchAllCameraAction.rejected.type}))
      .toEqual({...state, isLoading: false});
  });
});


