import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BreadCrumbs from './bread-crumbs';
import { AppRoute } from '../../const/app-route';


describe('Banner Component', () => {
  it('should display breadcrumbs correctly', () => {
    render(
      <MemoryRouter>
        <BreadCrumbs />
      </MemoryRouter>
    );
    const mainLink = screen.getByRole('link', { name: /главная/i });
    expect(mainLink).toBeInTheDocument();
    expect(mainLink).toHaveAttribute('href', AppRoute.Main);

    const catalogText = screen.getByText('Каталог');
    expect(catalogText).toBeInTheDocument();
    expect(catalogText).toHaveClass('breadcrumbs__link--active');
  });

  it('should render breadcrumbs structure properly', () => {
    render(
      <MemoryRouter>
        <BreadCrumbs />
      </MemoryRouter>
    );
    const breadcrumbsContainer = screen.getByTestId('breadcrumbs-container');
    expect(breadcrumbsContainer).toBeInTheDocument();
  });
});
