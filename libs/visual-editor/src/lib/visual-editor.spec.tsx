import React from 'react';
import { render } from '@testing-library/react';

import VisualEditor from './visual-editor';

describe(' VisualEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<VisualEditor />);
    expect(baseElement).toBeTruthy();
  });
});
