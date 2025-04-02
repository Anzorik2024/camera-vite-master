import { render, screen } from '@testing-library/react';
import IconStar from './icon-star';


describe('IconStar Component', () => {
  it('renders the full star icon when isFull is true', () => {
    render(<IconStar isFull />);
    const svgElement = screen.getByTestId('img-icon');
    const useElement = screen.getByTestId('icon-use');

    expect(svgElement).toBeInTheDocument();
    expect(useElement).toHaveAttribute('xlink:href', '#icon-full-star');
  });

  it('renders the empty star icon when isFull is false', () => {

    render(<IconStar isFull={false} />);

    const svgElement = screen.getByTestId('img-icon');
    const useElement = screen.getByTestId('icon-use');

    expect(svgElement).toBeInTheDocument();
    expect(useElement).toHaveAttribute('xlink:href', '#icon-star');
  });

  it('applies the correct width and height attributes', () => {
    render(<IconStar isFull />);

    const svgElement = screen.getByTestId('img-icon');

    expect(svgElement).toHaveAttribute('width', '17');
    expect(svgElement).toHaveAttribute('height', '16');
  });
});
