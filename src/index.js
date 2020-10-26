const { app, BrowserWindow, Menu, dialog } = require('electron');
const { join } = require('path');
const establishIpc = require('./ipc');
const customMenu = require('./menu');

const webContentPath = join(__dirname, '..', 'app', 'index.html');
const iconPath = join(__dirname, '..', 'icons', 'app.ico');

function createWindow() {
  const window = new BrowserWindow({
    width: 800,
    height: 525,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: iconPath,
  });

  window.on('close', () => {
    app.quit();
  });

  Menu.setApplicationMenu(customMenu);
  window.loadFile(webContentPath);
  
  window.on('close', () => {
    app.quit();
  });

  process.on('uncaughtException', (e) => {
    dialog.showErrorBox('Oppps!', e.message || e);
    window.webContents.send('done');
  });

  establishIpc(window);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => app.quit());

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
