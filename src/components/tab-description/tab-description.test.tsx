import {render, screen} from '@testing-library/react';

import TabDescription from './tab-description';

import { fakeCamera } from '../../utils/mock';

describe('Component: Description Tab', () => {
  it('should render correctly', () => {
    render (
      <TabDescription description={fakeCamera.description} isActive/>
    );

    expect(screen.getByText(fakeCamera.description)).toBeInTheDocument();
  });
});
