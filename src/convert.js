const { app } = require('electron');
const { join, dirname } = require('path');
const { promisify } = require('util');
const { exec, execSync } = require('child_process');
const pdf2img = require('pdf2img');
const temp = require('temp');

const mkdir = promisify(temp.mkdir.bind(temp));

const generateImagesFromPdf = (file, outputdir, size) =>
  new Promise((resolve, reject) => {
    pdf2img.setOptions({
      type: 'png',
      size,
      density: 600,
      outputdir,
      outputname: 'temp-img',
      page: null,
    });

    pdf2img.convert(file, function (err, info) {
      if (err) reject(err);
      else resolve();
    });
  });

const generateTiffImage = async (imgsDir) => {
  execSync(`magick.exe convert ${imgsDir}\\*.png ${imgsDir}\\images.tiff`);
};

const generateSearchablePdf = async (config, imgsDir) => {
  const input = join(imgsDir, 'images.tiff');
  execSync(`tesseract.exe "${input}" "${config.out}" -l ${config.lang} pdf`);
};

module.exports = async (config, window) => {
  temp.track();

  window.webContents.send('step1');
  const imgsDir = await mkdir('imgs-dir');

  window.webContents.send('step2');
  await generateImagesFromPdf(config.inFile, imgsDir, config.size);

  window.webContents.send('step3');
  await generateTiffImage(imgsDir);

  window.webContents.send('step4');
  await generateSearchablePdf(config, imgsDir);

  window.webContents.send('step5');
  temp.cleanupSync();
};
