const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('picoflashDesktop', {
  isElectron: true,
  platform: process.platform
});
