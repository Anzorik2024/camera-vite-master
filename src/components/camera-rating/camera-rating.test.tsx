import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import CameraRating from './camera-rating';

import { fakeCamera, mockStore } from '../../utils/mock';

const store = mockStore({
  product: {
    camera: fakeCamera,
  }
});

describe('Component: Camera Rating', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <CameraRating
            rating={fakeCamera.rating}
            reviewCount={fakeCamera.reviewCount}
          />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${'Рейтинг:'} ${fakeCamera.rating}`))).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
