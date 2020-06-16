import React from 'react';
import { render } from '@testing-library/react';

import AppNav from './app-nav';

describe(' AppNav', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<AppNav />);
    expect(baseElement).toBeTruthy();
  });
});
