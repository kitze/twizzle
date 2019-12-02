const windowSizes = require('./config/window-sizes');

const setWindowSize = (size, mainWindow, workAreaSize) => {
  const { width, height } = windowSizes[size](workAreaSize);
  mainWindow.setSize(width, height);
  mainWindow.center();
};

module.exports = setWindowSize;
