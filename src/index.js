import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

//components
import App from 'components/App';

//css
import 'modern-normalize/modern-normalize.css';
import './index.css';
import './components/Toggle/toggle.css';

//store
import store from 'redux-store';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
