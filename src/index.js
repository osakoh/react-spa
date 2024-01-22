import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDom.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // eslint-disable-next-line no-undef
  document.getElementById('app'),
);
