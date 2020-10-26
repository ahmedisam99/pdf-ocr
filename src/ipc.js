const { app, ipcMain, dialog } = require('electron');
const { join, basename, dirname } = require('path');
const notifier = require('node-notifier');

const convert = require('./convert');

module.exports = (window) => {
  // open a dialog for the user to select the input file and send the file's path to the web content
  ipcMain.handle('input-dialog', () => {
    dialog
      .showOpenDialog({
        properties: ['openFile'],
      })
      .then((value) => {
        window.webContents.send('input-value', value);
      })
      .catch(console.error);
  });

  // open a dialog for the user to select the desired output directory and send the its path to the web content
  ipcMain.handle('output-dialog', () => {
    dialog
      .showOpenDialog({
        properties: ['openDirectory'],
      })
      .then((value) => {
        window.webContents.send('output-value', value);
      })
      .catch(console.error);
  });

  // sends the desktop full path as a default output directory
  ipcMain.handle('default-out-dir', () => {
    window.webContents.send('default-out-dir', app.getPath('desktop'));
  });

  // starts the conversion
  ipcMain.handle('convert', (e, data) => {
    const errors = [];
    if (!['ara', 'eng', 'ara+eng'].includes(data.lang))
      errors.push('Please choose the language of the document');
    if (!data.inFile) errors.push('Please choose a pdf file as an input');
    if (!data.outDir) errors.push('Please choose the desired output directory');

    if (errors.length) {
      dialog.showErrorBox(
        'Oppps!',
        errors.reduce((prev, curr) => (prev += `${curr}\n`), ''),
      );
      return;
    }

    const outFile = basename(data.inFile).split('.')[0] + ' - OCR';
    data.out = join(data.outDir, outFile);
    delete data.outDir;

    convert(data, window)
      .then(() => {
        if (window.isFocused()) {
          dialog.showMessageBox(window, {
            type: 'info',
            buttons: ['OK'],
            title: 'PDF Optical Character Recognition',
            message: 'Done!',
            detail: 'Your pdf file is now searchable and ready for usage.',
          });
        } else {
          notifier.notify(
            {
              title: 'Done!',
              message: 'Your pdf file is now searchable and ready for usage.',
              icon: join(dirname(app.getAppPath()), 'icons', 'app.ico'),
              sound: true,
            },
            function (err, response) {
              if (response === 'activate') {
                window.moveTop();
                window.focus();
              }
            },
          );
        }

        window.webContents.send('done');
      })
      .catch((e) => {
        dialog.showErrorBox('Oppps!', e.message || e);
        window.webContents.send('done');
      });
  });
};
