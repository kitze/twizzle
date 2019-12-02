import { applyMiddleware, createStore } from 'redux';
import { forwardToMain, getInitialStateRenderer, replayActionRenderer } from 'electron-redux';
import ReduxThunk from 'redux-thunk';
const reducer = require('./reducer');

const index = createStore(
  reducer,
  getInitialStateRenderer(),
  applyMiddleware(forwardToMain, ...[ReduxThunk])
);

replayActionRenderer(index);

export default index;
