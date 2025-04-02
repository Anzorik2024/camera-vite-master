import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Banner from './banner';
import { AppRoute } from '../../const/app-route';

describe('Banner Component', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    const image = screen.getByAltText('баннер');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'img/content/banner-bg.jpg');

    expect(screen.getByText('Новинка!')).toBeInTheDocument();
    expect(screen.getByText('Cannonball Pro MX 8i')).toBeInTheDocument();
    expect(screen.getByText(/Профессиональная камера от известного производителя/i)).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Подробнее' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `${AppRoute.Product}/1`);
  });

  it('should have correct image sources', () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    const image = screen.getByAltText('баннер');
    expect(image).toHaveAttribute('srcSet', 'img/content/banner-bg@2x.jpg 2x');
  });

  it('should apply correct CSS classes', () => {
    render(
      <MemoryRouter>
        <Banner />
      </MemoryRouter>
    );

    const message = screen.getByText('Новинка!');
    expect(message).toHaveClass('banner__message');

    const title = screen.getByText('Cannonball Pro MX 8i');
    expect(title).toHaveClass('title', 'title--h1');
  });
});
