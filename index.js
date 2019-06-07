import React from 'react';
import { render } from 'react-dom';

import FirebaseApp from './FirebaseApp';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

render(
  <MuiThemeProvider>
    <FirebaseApp />
  </MuiThemeProvider>,
  document.getElementById('root')
);
