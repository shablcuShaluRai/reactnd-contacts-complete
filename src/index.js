import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//BrowserRouter will listen to changes in the URL.
// when changes happen , it make sure that correct screen show up.
ReactDOM.render(
  <BrowserRouter><App /></BrowserRouter>,
   document.getElementById('root'));
registerServiceWorker();
