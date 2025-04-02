import { render, screen } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketItemShort from './basket-item-short';

import { fakeCamera, mockStore } from '../../utils/mock';

const store = mockStore({
  order: {
    selectedCamera: fakeCamera,
  }
});

describe('Component: Basket item short', () => {
  it('should render correctly with all necessary information', () => {
    render(
      <Provider store={store}>
        <BasketItemShort camera={fakeCamera} />
      </Provider>
    );

    const imgElement = screen.getByRole('img', { name: fakeCamera.name });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', fakeCamera.previewImg);
    expect(imgElement).toHaveAttribute('srcSet', `${fakeCamera.previewImg2x} 2x`);

    expect(screen.getByText(`${fakeCamera.category} «${fakeCamera.name}»`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.vendorCode}`)).toBeInTheDocument();
    expect(screen.getByText(`${fakeCamera.level} уровень`)).toBeInTheDocument();
  });

});
