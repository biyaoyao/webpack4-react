import React from 'react';
import './assets/css/index.less';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import App from './App';
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('app')
  );
};
render(App);