const initialState = require('./initial-state');
const constants = require('./constants');

const {
  SET_SETTINGS,
  CLEAR_CACHE,
  TOGGLE_SETTING,
  SET_AUTHED,
  SET_INITIALIZED,
  SET_DARK_MODE,
  SET_SIZE,
  SET_URL,
  TOGGLE_WINDOW_SIZE,
  TOGGLE_THEME,
  SET_NIGHT_MODE
} = constants;

const reducer = function defaultReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_INITIALIZED:
      return Object.assign({}, state, { initialized: payload });
    case SET_DARK_MODE:
      return Object.assign({}, state, { darkMode: payload });
    case SET_SIZE:
      return Object.assign({}, state, { size: payload });
    case SET_SETTINGS:
      return Object.assign({}, state, { showSettings: payload });
    case CLEAR_CACHE:
      return Object.assign({}, initialState);
    case TOGGLE_SETTING:
      return Object.assign({}, state, { [payload]: !state[payload] });
    case SET_AUTHED:
      return Object.assign({}, state, { isAuthed: payload });
    case SET_URL:
      return Object.assign({}, state, { url: payload });
    case TOGGLE_WINDOW_SIZE:
      return Object.assign({}, state, { size: state.size === 'large' ? 'small' : 'large' });
    case TOGGLE_THEME:
      return Object.assign({}, state, { nightMode: !state.nightMode });
    case SET_NIGHT_MODE:
      return Object.assign({}, state, { nightMode: payload });
    default:
      return state;
  }
};

module.exports = reducer;
