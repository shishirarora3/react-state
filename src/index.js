import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppWithProps from './AppWithProps';
//import AppWithContext from './AppWithContext';
//import AppWithRedux from './AppWithRedux';
//import AppWithRecoil from './AppWithRecoil';
//import AppWithSharedState from './AppWithSharedState';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <AppWithProps />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
