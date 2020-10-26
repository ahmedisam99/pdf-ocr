const { app, Menu, shell, clipboard } = require('electron');
const { dirname } = require('path');

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
          shell.openExternal('https://github.com/ahmedisam99/pdf-ocr');
        },
      },
      {
        label: 'Source Code',
        accelerator: 'Ctrl+O',
        click() {
          clipboard.writeText(dirname(app.getAppPath()));
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
