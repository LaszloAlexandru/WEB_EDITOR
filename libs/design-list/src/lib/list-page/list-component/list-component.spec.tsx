import React from 'react';
import { render } from '@testing-library/react';

import ListComponent from './list-component';

describe(' ListComponent', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListComponent />);
    expect(baseElement).toBeTruthy();
  });
});
