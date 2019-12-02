const isDev = require('electron-is-dev');

const installExtensions = () => {
  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS
    } = require('electron-devtools-installer');
    // installExtension(REACT_DEVELOPER_TOOLS);
    // installExtension(REDUX_DEVTOOLS);
  }
};

module.exports = installExtensions;
