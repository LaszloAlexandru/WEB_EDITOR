import React from 'react';
import { render } from '@testing-library/react';

import ListSearchBar from './list-search-bar';

describe(' ListSearchBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ListSearchBar />);
    expect(baseElement).toBeTruthy();
  });
});
