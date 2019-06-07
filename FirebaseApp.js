import React from 'react';
import { FirebaseAppProvider } from '@use-firebase/app';
import { FirebaseAuthProvider } from '@use-firebase/auth';

import App from './components';

import config from './data/config.json';

const FirebaseApp = () => (
  <FirebaseAppProvider config={config} >
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  </FirebaseAppProvider>
);

export default FirebaseApp;