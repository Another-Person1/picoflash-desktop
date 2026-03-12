# pico⚡flash

Use [pico⚡flash](https://picoflash.org) to flash your Raspberry Pi Pico microcontroller directly from your web browser using WebUSB.

Requires Chrome, Edge or another Chromium-based browser with WebUSB support.

Works on Windows, macOS, Linux and Android.

As well as a [website](https://picoflash.org) pico⚡flash is a full Javascript implementation of Raspberry Pi's PICOBOOT protocol, for flashing and managing RP2040 and RP2350 microcontrollers over USB.

## Features

- Read, write and erase flash memory
- Reset and reboot the device
- Enter and exit XIP mode (RP2040 only)
- Exclusive access mode to prevent other software from interfering
- Read and write OTP (One-Time Programmable) memory
- Supports RP2040 and RP2350 microcontrollers
- Supports custom VID/PID devices (OTP programmed)
- Web front-end and comprehensive JavaScript API
- Full error handling
- Detailed console logging

## Desktop App (Electron)

pico⚡flash can also run as a desktop app using Electron.

### Run locally

From the repository root:

```bash
npm install
npm start
```

### Build an installer

```bash
npm run dist
```

This creates a packaged desktop build using `electron-builder`.

## Links

- [Website](https://picoflash.org)
- [GitHub Repository](https://github.com/picoflash/picoflash)
- [piers.rocks YouTube Channel](https://www.youtube.com/@piers_rocks)

## License

[MIT License](LICENSE) - Copyright (C) 2025 Piers Finlayson
