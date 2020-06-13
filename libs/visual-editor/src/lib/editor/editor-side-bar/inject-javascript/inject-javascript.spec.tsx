import React from 'react';
import { render } from '@testing-library/react';

import InjectJavascript from './inject-javascript';

describe(' InjectJavascript', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InjectJavascript />);
    expect(baseElement).toBeTruthy();
  });
});
