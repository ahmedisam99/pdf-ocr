const { app, Menu, shell, clipboard } = require('electron');
const { dirname, join } = require('path');

const menuBarTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Exit',
        accelerator: 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Copy bin path',
        accelerator: 'Ctrl+c',
        click() {
          clipboard.writeText(join(dirname(app.getAppPath()), 'bin'));
        },
      },
      {
        label: 'Source Code',
        accelerator: 'Ctrl+O',
        click() {
          shell.openExternal('https://github.com/ahmedisam99/pdf-ocr');
        },
      },
    ],
  },
];

menuBarTemplate.push({
  label: 'DevTools',
  submenu: [
    {
      role: 'toggleDevtools',
    },
    {
      role: 'reload',
    },
  ],
});

module.exports = Menu.buildFromTemplate(menuBarTemplate);
