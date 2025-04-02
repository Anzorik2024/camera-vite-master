import { render, screen } from '@testing-library/react';
import SocialList from './social-list';

describe('Component: Social List', () => {
  it('should render correctly', () => {

    render(
      <SocialList/>
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
  });
});
