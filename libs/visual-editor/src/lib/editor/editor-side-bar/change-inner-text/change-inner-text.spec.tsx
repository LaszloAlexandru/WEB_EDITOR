import React from 'react';
import { render } from '@testing-library/react';

import ChangeInnerTextt from './change-inner-text';

describe(' ChangeInnerTextt', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChangeInnerTextt />);
    expect(baseElement).toBeTruthy();
  });
});
