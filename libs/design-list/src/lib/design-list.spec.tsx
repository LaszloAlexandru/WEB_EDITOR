import React from 'react';
import { render } from '@testing-library/react';

import DesignList from './design-list';

describe(' DesignList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DesignList />);
    expect(baseElement).toBeTruthy();
  });
});
