const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './electron/main.js',
  output: {
    filename: 'electron.js',
    path: path.resolve(__dirname, 'build')
  },
  node: {
    fs: 'empty',
    __dirname: false,
    __filename: false
  },
  devtool: 'source-map',
  plugins: [
    new UglifyJSPlugin({
      parallel: true,
      sourceMap: true
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  target: 'electron-main',
  mode: 'production'
};
