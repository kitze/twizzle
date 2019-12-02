const path = require('path');

const isDev = require('electron-is-dev');

const localUrl = 'http://localhost:3000';
const localCompose = `${localUrl}/?page=compose`;
const localMessages = `${localUrl}/?page=messages`;

const prodMessages = `file://${path.join(__dirname, 'index.html?page=messages')}`;
const prodCompose = `file://${path.join(__dirname, 'index.html?page=compose')}`;

const messagesUrl = isDev ? localMessages : prodMessages;
const composeUrl = isDev ? localCompose : prodCompose;

let iconPath = path.join(__dirname, 'icons/iconTemplate.png');

if (process.platform !== 'darwin') {
  iconPath = path.join(__dirname, 'icons/iconLight.png');
}

module.exports = {
  messagesUrl,
  composeUrl,
  iconPath
};
