const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function override(config, env) {
  let isDev = env === 'development';

  config.target = 'electron-renderer';

  config = injectBabelPlugin('babel-plugin-transform-decorators-legacy', config);
  config = injectBabelPlugin('babel-plugin-transform-do-expressions', config);
  config = injectBabelPlugin('babel-plugin-emotion', config);
  config = injectBabelPlugin('babel-plugin-preval', config);

  if (!isDev) {
    config = injectBabelPlugin('transform-remove-console', config);
  }

  config.externals = [
    {
      'electron-debug': 'electron-debug',
      encoding: 'encoding',
      'electron-better-ipc': `require('electron-better-ipc')`,
      'electron-context-menu': `require('electron-context-menu')`,
      'supports-color': `require('supports-color')`
    }
  ];

  return config;
};
