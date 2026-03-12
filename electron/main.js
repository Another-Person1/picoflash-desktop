const { app, BrowserWindow, shell, dialog } = require('electron');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const ALLOWED_PROTOCOLS = new Set([
  'file:',
  'data:',
  'blob:',
  'about:',
  'devtools:'
]);

// Disable Chromium/Electron telemetry and background reporting features.
app.commandLine.appendSwitch('disable-background-networking');
app.commandLine.appendSwitch('disable-component-update');
app.commandLine.appendSwitch('disable-domain-reliability');
app.commandLine.appendSwitch('disable-sync');
app.commandLine.appendSwitch('metrics-recording-only');
app.commandLine.appendSwitch('no-pings');
app.commandLine.appendSwitch('disable-breakpad');
app.commandLine.appendSwitch('disable-features', 'AutofillServerCommunication,OptimizationHints,MediaRouter,CertificateTransparencyComponentUpdater');

function isAllowedRequest(urlString) {
  try {
    const { protocol } = new URL(urlString);
    return ALLOWED_PROTOCOLS.has(protocol.toLowerCase());
  } catch (_error) {
    return false;
  }
}

function usbDeviceLabel(device) {
  const productName = device.productName || 'USB Device';
  const serialNumber = device.serialNumber || '-';
  return `${productName} (VID:PID ${device.vendorId.toString(16).padStart(4, '0')}:${device.productId.toString(16).padStart(4, '0')}) SN:${serialNumber}`;
}

async function createWindow() {
  const window = new BrowserWindow({
    width: 1200,
    height: 900,
    minWidth: 900,
    minHeight: 700,
    icon: path.join(projectRoot, 'favicon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      webSecurity: true
    }
  });

  const session = window.webContents.session;

  session.webRequest.onBeforeRequest((details, callback) => {
    callback({ cancel: !isAllowedRequest(details.url) });
  });

  // Allow browser-level WebUSB prompts from app content.
  session.setPermissionCheckHandler((_wc, permission) => {
    return permission === 'usb';
  });

  session.setPermissionRequestHandler((_wc, permission, callback) => {
    if (permission === 'usb') {
      callback(true);
      return;
    }
    callback(false);
  });

  window.webContents.on('select-usb-device', async (event, details, callback) => {
    event.preventDefault();

    const devices = details.deviceList || [];
    if (devices.length === 0) {
      callback('');
      return;
    }

    const buttonLabels = devices.map(usbDeviceLabel);
    buttonLabels.push('Cancel');

    try {
      const result = await dialog.showMessageBox(window, {
        type: 'question',
        title: 'Select USB Device',
        message: 'Choose a device to connect to picoflash',
        buttons: buttonLabels,
        cancelId: buttonLabels.length - 1,
        noLink: true
      });

      if (result.response >= 0 && result.response < devices.length) {
        callback(devices[result.response].deviceId);
      } else {
        callback('');
      }
    } catch (_error) {
      callback('');
    }
  });

  window.webContents.setWindowOpenHandler(({ url: targetUrl }) => {
    shell.openExternal(targetUrl);
    return { action: 'deny' };
  });

  await window.loadFile(path.join(projectRoot, 'index.html'));
}

app.whenReady().then(async () => {
  await createWindow();

  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
