const url = require('url');
const path = require('path');

const getBuildUrl = query => {
  return url.format({
    pathname: path.join(__dirname, `index.html?page=${query}`),
    protocol: 'file:',
    slashes: true
  });
};

module.exports = getBuildUrl;
