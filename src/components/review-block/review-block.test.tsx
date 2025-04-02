import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import ReviewBlock from './review-block';

import { mockStore, } from '../../utils/mock';


const store = mockStore({
  product: {
    reviews: []
  }
});


describe('ReviewBlock Component', () => {

  test('renders title correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewBlock />
        </MemoryRouter>
      </Provider>
    );

    const titleElement = screen.getByTestId('title-review');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.textContent).toBe('Отзывы');
  });

});
