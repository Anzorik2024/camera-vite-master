import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import CameraInfo from './camera-info';

import { fakeCamera, mockStore } from '../../utils/mock';

const store = mockStore({
  product: {
    camera: fakeCamera,
  }
});

describe('Component: Camera Info', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CameraInfo
            camera={fakeCamera}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
    expect(screen.getByAltText(fakeCamera.name)).toBeInTheDocument();
  });
});
