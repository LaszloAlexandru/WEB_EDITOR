import React from 'react';
import { render } from '@testing-library/react';

import SignupModal from './signup-modal';

describe(' SignupModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SignupModal />);
    expect(baseElement).toBeTruthy();
  });
});
