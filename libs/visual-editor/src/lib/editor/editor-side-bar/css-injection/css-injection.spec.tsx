import React from 'react';
import { render } from '@testing-library/react';

import CssInjection from './css-injection';

describe(' CssInjection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CssInjection />);
    expect(baseElement).toBeTruthy();
  });
});
