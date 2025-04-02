import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ProductCard from './product-card';

import { fakeCamera, mockStore } from '../../utils/mock';

const store = mockStore({
  product: {
    camera: fakeCamera,

  }
});

const mockOnAddCameraInBasketClickButton = vi.fn();
describe('BasketModal Component', () => {

  it('renders product card with correct data', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard
            camera={fakeCamera}
            onAddCameraInBasketClickButton={mockOnAddCameraInBasketClickButton}
          />
        </MemoryRouter>
      </Provider>

    );

    expect(screen.getByText(fakeCamera.name)).toBeInTheDocument();
    expect(screen.getByText(fakeCamera.reviewCount)).toBeInTheDocument();
  });
});
