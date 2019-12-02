const s = require('./constants');

const { SET_SETTINGS, CLEAR_CACHE, TOGGLE_SETTING, SET_AUTHED, SET_URL, TOGGLE_THEME, SET_NIGHT_MODE } = s;

module.exports = {
  toggleSetting: setting => ({ type: TOGGLE_SETTING, payload: setting }),
  setUrl: url => ({ type: SET_URL, payload: url }),
  setAuthed: authed => ({ type: SET_AUTHED, payload: authed }),
  setNightMode: nightMode => ({ type: SET_NIGHT_MODE, payload: nightMode }),
  toggleTheme: () => ({ type: TOGGLE_THEME }),
  closeSettings: () => ({ type: SET_SETTINGS, payload: false }),
  showSettings: () => ({ type: SET_SETTINGS, payload: true }),
  clearCache: () => ({ type: CLEAR_CACHE })
};
