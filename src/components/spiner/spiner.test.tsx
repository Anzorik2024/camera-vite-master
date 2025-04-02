import { render, screen } from '@testing-library/react';
import Spiner from './spiner';

describe('Spiner Component', () => {
  test('renders spinner element with correct class', () => {
    render(<Spiner />);

    const spinnerElement = screen.getByTestId('spinner');
    expect(spinnerElement).toBeInTheDocument();
    expect(spinnerElement).toHaveClass('loader');
  });
});
