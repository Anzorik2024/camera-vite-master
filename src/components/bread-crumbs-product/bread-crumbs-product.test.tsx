import {render, screen} from '@testing-library/react';
import {MemoryRouter} from 'react-router-dom';
import { AppRoute } from '../../const/app-route';

import BreadCrumbsProduct from './bread-crumbs-product';
import { fakeCamera } from '../../utils/mock';

describe('BreadCrumbsProduct Component', () => {

  it('should display breadcrumbs correctly', () => {
    render(
      <MemoryRouter>
        <BreadCrumbsProduct camera={fakeCamera} />
      </MemoryRouter>
    );
    const mainLink = screen.getByRole('link', { name: /главная/i });
    expect(mainLink).toBeInTheDocument();
    expect(mainLink).toHaveAttribute('href', AppRoute.Main);

    const catalogText = screen.getByText('Каталог');
    expect(catalogText).toBeInTheDocument();
  });

});
