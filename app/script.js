const { ipcRenderer } = require('electron');
const stepsMsgs = require('./steps.json');

const form = document.querySelector('.form');
const inBtn = document.querySelector('.in-btn');
const outBtn = document.querySelector('.out-btn');
const convertBtn = document.querySelector('.sub-btn');
const convertBtnTxt = document.querySelector('.sub-btn-txt');
const inInput = document.querySelector('.in-input');
const outInput = document.querySelector('.out-input');
const loadingDots = document.querySelector('.loading-dots');
console.log(loadingDots);

window.onload = () => {
  ipcRenderer.on('default-out-dir', (e, data) => {
    outInput.value = data;
  });

  ipcRenderer.invoke('default-out-dir');
};

ipcRenderer.on('input-value', (e, data) => {
  inInput.value = data.filePaths[0];
});

ipcRenderer.on('output-value', (e, data) => {
  outInput.value = data.filePaths[0];
});

ipcRenderer.on('step1', () => {
  convertBtn.disabled = true;
  convertBtn.style.cursor = 'not-allowed';
  loadingDots.style.display = 'inline-block';
  convertBtnTxt.textContent = stepsMsgs['step1'];
});

ipcRenderer.on('step2', () => {
  convertBtnTxt.textContent = stepsMsgs['step2'];
});

ipcRenderer.on('step3', () => {
  convertBtnTxt.textContent = stepsMsgs['step3'];
});

ipcRenderer.on('step4', () => {
  convertBtnTxt.textContent = stepsMsgs['step4'];
});

ipcRenderer.on('step5', () => {
  convertBtnTxt.textContent = stepsMsgs['step5'];
});

ipcRenderer.on('done', () => {
  loadingDots.style.display = 'none';
  convertBtn.disabled = false;
  convertBtn.style.cursor = 'pointer';
  convertBtnTxt.textContent = 'Convert';
});

inBtn.addEventListener('click', () => {
  ipcRenderer.invoke('input-dialog');
});

outBtn.addEventListener('click', () => {
  ipcRenderer.invoke('output-dialog');
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const langInput = document.querySelector('input[name=lang]:checked');
  const size = document.querySelector('input[name=size]:checked').value;
  let lang = '';
  if (langInput) lang = langInput.value;
  const inFile = inInput.value;
  const outDir = outInput.value;

  ipcRenderer.invoke('convert', { lang, inFile, outDir, size: Number(size) });
});
