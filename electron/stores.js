const Store = require('electron-store');
const lodash = require('lodash');

const persistKeys = require('./persist-keys');
const initialState = require('../src/redux-store/initial-state');
const reducer = require('../src/redux-store/reducer');

const { createStore, applyMiddleware } = require('redux');
const { forwardToRenderer, triggerAlias, replayActionMain } = require('electron-redux');

//middleware
const persistMiddleware = store => next => action => {
  const result = next(action);
  const nextStore = store.getState();
  ElectronStore.store = lodash.pick(nextStore, persistKeys);
  return result;
};

//electron store
const ElectronStore = new Store({
  defaults: lodash.pick(initialState, persistKeys)
});

//redux store
const store = createStore(
  reducer,
  Object.assign({}, initialState, ElectronStore.store),
  applyMiddleware(triggerAlias, persistMiddleware, forwardToRenderer)
);

replayActionMain(store);

module.exports = {
  store
};
