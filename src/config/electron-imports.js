import $contextMenu from 'electron-context-menu';
const { ipcRenderer } = window.require('electron-better-ipc');

export const ipc = ipcRenderer;
export const contextMenu = $contextMenu;
