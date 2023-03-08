import React from 'react'
import ReactDOM from 'react-dom/client'
import { ColorModeScript } from '@chakra-ui/react';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript />
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
