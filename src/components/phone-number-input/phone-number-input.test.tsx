import { render, screen, fireEvent } from '@testing-library/react';
import PhoneNumberInput from './phone-number-input';
import { Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';

import { fakeCamera, mockStore, fakePhoneNumber } from '../../utils/mock';

const setIsButtonDisabled = vi.fn();
const inputRef = { current: null };

const store = mockStore({
  order: {
    selectedCamera: fakeCamera,
    tel: fakePhoneNumber
  }
});
describe('PhoneNumberInput Component - Class Tests', () => {
  it('displays an error for invalid characters', async () => {
    render(
      <Provider store={store}>
        <PhoneNumberInput
          inputRef={inputRef}
          setIsButtonDisabled={setIsButtonDisabled}
          isOpen
        />
      </Provider>

    );

    const input = screen.getByTestId('input-phone');
    await userEvent.type(input, 'abc');
    expect(screen.getByText(/недопустимые символы/i)).toBeInTheDocument();
  });

  it('formats phone number correctly on valid input', () => {
    render(
      <Provider store={store}>
        <PhoneNumberInput
          inputRef={inputRef}
          setIsButtonDisabled={setIsButtonDisabled}
          isOpen
        />
      </Provider>
    );


    const input = screen.getByTestId('input-phone');

    fireEvent.change(input, { target: { value: '89123456789' } });
    expect(input).toHaveValue('+7(912)345-67-89');
  });

});

