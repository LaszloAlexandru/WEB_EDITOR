import React from 'react';
import { render } from '@testing-library/react';

import BackgroundChange from './background-change';

describe(' BackgroundChange', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<BackgroundChange />);
    expect(baseElement).toBeTruthy();
  });
});
