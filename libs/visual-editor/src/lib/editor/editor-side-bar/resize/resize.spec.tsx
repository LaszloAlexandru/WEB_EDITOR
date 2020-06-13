import React from 'react';
import { render } from '@testing-library/react';

import Resize from './resize';

describe(' Resize', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Resize />);
    expect(baseElement).toBeTruthy();
  });
});
