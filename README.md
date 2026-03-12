# pico⚡flash desktop
This will probably be edited more later, as this is very much in progress software.

Desktop app for flashing RP2040/RP2350 based microcontrollers using WebUSB and Electron.
Based on [pico⚡flash](https://github.com/piersfinlayson/picoflash) by Piers Finlayson.
I am not affiliated with his project so any complaints about this project should not be sent to him.

Works on Windows, other operating systems will be added later.

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

## Links
- [Original GitHub Repository](https://github.com/picoflash/picoflash)

## License

[MIT License](LICENSE) - Copyright (C) 2026 Another-Person1, Copyright (C) 2025 Piers Finlayson
