import React from 'react';
import { render } from '@testing-library/react';

import EditorSideBar from './editor-side-bar';

describe(' EditorSideBar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditorSideBar />);
    expect(baseElement).toBeTruthy();
  });
});
