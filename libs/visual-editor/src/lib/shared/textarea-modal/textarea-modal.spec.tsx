import React from 'react';
import { render } from '@testing-library/react';

import TextareaModal from './textarea-modal';

describe(' TextareaModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<TextareaModal />);
    expect(baseElement).toBeTruthy();
  });
});
