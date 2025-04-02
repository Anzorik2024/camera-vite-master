import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider} from 'react-redux';

import BasketModal from './basket-modal';

import { fakeCamera, mockStore, fakePhoneNumber } from '../../utils/mock';
const store = mockStore({
  order: {
    selectedCamera: fakeCamera,
    tel: fakePhoneNumber
  }
});

describe('BasketModal Component', () => {

  const renderComponent = (props = {}) => {
    const defaultProps = {
      onCloseModal: vi.fn(),
      isOpen: true,
    };

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <BasketModal {...defaultProps} {...props} />
        </MemoryRouter>
      </Provider>
    );
  };

  it ('renders modal when isOpen is true', () => {
    renderComponent();

    expect(screen.getByText('Свяжитесь со мной')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /закрыть попап/i })).toBeInTheDocument();
  });

  test('calls onCloseModal when close button is clicked', () => {
    const onCloseModalMock = vi.fn();
    renderComponent({ onCloseModal: onCloseModalMock });

    const closeButton = screen.getByRole('button', { name: /закрыть попап/i });
    fireEvent.click(closeButton);

    expect(onCloseModalMock).toHaveBeenCalledTimes(1);
  });

  it ('disables order button when phone number is invalid', () => {
    renderComponent();
    const orderButton = screen.getByRole('button', { name: /заказать/i });
    expect(orderButton).toBeDisabled();
  });

  it ('enables order button when phone number is valid', async () => {
    renderComponent();

    const phoneNumberInput = screen.getByRole('textbox');
    fireEvent.change(phoneNumberInput, { target: { value: '+79991234567' } });

    await waitFor(() => {
      const orderButton = screen.getByRole('button', { name: /заказать/i });
      expect(orderButton).not.toBeDisabled();
    });
  });
});
