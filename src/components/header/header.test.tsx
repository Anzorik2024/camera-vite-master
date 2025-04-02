import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from './header';

describe('Header Component', () => {
  it('renders the logo with the correct link', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole('link', { name: /переход на главную/i });
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', '/');
  });

  it('displays all menu items', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const menuItems = screen.getAllByRole('listitem');
    expect(menuItems.length).toBe(4);

  });

  it('checks the correctness of classes', () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const header = screen.getByTestId('header');
    const nav = screen.getByRole('navigation');

    expect(header).toHaveClass('header');
    expect(nav).toHaveClass('main-nav');
  });
});
