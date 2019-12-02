const { WEB_URL } = require('../src/strings');
const { app, dialog } = require('electron');
const optional = (opt, value, secondValue = null) => (opt ? value : secondValue);

const isMac = process.platform === 'darwin';

const buildMenu = ({
  config: { appName, showAccount = true, showCache = false },
  methods: { clearCache, checkUpdates, logout, openPreferences }
}) => {
  const mainSubmenu = [
    {
      role: 'about',
      click() {
        dialog.showMessageBox({
          type: 'info',
          title: appName,
          message: appName,
          detail: `Version: ${app.getVersion()} \nSite: ${WEB_URL}`
        });
      }
    },
    { type: 'separator' },
    ...optional(
      isMac,
      [
        { role: 'services', submenu: [] },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' }
      ],
      []
    ),
    { role: 'quit' }
  ];

  if (showAccount) {
    mainSubmenu.unshift({
      label: 'Preferences',
      accelerator: 'CmdOrCtrl+,',
      click: () => {
        openPreferences();
      }
    });
  }

  if (showCache) {
    mainSubmenu.unshift({
      label: 'Clear app cache',
      click() {
        clearCache();
      }
    });
  }

  return [
    {
      label: appName,
      submenu: mainSubmenu
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' }
      ]
    },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'forcereload' }]
    },
    {
      role: 'window',
      submenu: [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    },
    optional(showAccount, {
      label: 'Account',
      submenu: [
        {
          label: 'Logout',
          click() {
            logout();
          }
        }
      ]
    })
  ].filter(el => el !== null);
};

module.exports = buildMenu;
