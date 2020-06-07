import React from 'react';

import './app.scss';

import {VisualEditor} from "@web-editor/visual-editor"
import {LandingPage} from '@web-editor/landing-page';

export const App = () => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
    <div className="app">
      <LandingPage/>
    </div>
  );
};

export default App;
