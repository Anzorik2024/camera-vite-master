import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import ButtonToTop from './button-to-top';
import { fakeCamera, mockStore } from '../../utils/mock';


const store = mockStore({
  product: {
    camera: fakeCamera,
  }
});

describe('Component: Button to top', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <MemoryRouter>
          <ButtonToTop/>
        </MemoryRouter>
      </Provider>
    );
    const upBtn = screen.getByTestId('up-btn');
    expect(upBtn).toBeInTheDocument();
  });
});
