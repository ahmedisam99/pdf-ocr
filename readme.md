# PDF Optical Character Recognition

## Dependencies (third-party)

- [GraphicsMagick](http://www.graphicsmagick.org/download.html)
- [Ghostscript](https://sourceforge.net/projects/ghostscript/files/GPL%20Ghostscript/9.09/gs909w64.exe/download)
- [ImageMagick](https://imagemagick.org/script/download.php)
- [Tesseract-OCR](https://github.com/tesseract-ocr/tesseract)

## Overview
An electron based windows applicatoin for the conversion of scanned pdf files and/or _(weird)_ arabic pdf files (in which search feature doesn't work) into a searchable pdf files using google's tesseract optical character recognition tool.

## Fails :(

- GraphicsMagic, ImageMagick, and Tesseract-OCR are all pre-built with the app exept for Ghostscript which is a dependency of GraphicsMagic which i could not re-configure to consider the new path of the binaries of Ghostscript. **So it shall be installed seperatly**.

- It bored me to read the docs of how to write an nsis script `(.nsh/.nsi)` in order to automatically update `%PATH%` environment variable. **So it shall be updated manually (the path can be copied into clipboard from within the help submenu)**.
