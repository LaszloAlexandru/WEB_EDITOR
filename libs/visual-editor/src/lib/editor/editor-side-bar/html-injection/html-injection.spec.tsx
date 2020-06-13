import React from 'react';
import { render } from '@testing-library/react';

import HtmlInjection from './html-injection';

describe(' HtmlInjection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HtmlInjection />);
    expect(baseElement).toBeTruthy();
  });
});
