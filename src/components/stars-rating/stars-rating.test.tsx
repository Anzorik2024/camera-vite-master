import { render, screen } from '@testing-library/react';
import StarsRating from './stars-rating';

// Mock constants
describe('StarsRating Component', () => {
  test('renders correct number of stars', () => {
    render(<StarsRating rating={3} />);

    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5);
  });
});
