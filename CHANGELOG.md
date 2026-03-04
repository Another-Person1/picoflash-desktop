# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.1] - 2025-03-04

This release adds more robust error handling for the picoboot protocol.  Endpoint stalls are now resolved using CLEAR_FEATURE (ENDPOINT_HALT) as soon as they are detected.  This keeps the data toggle PID in sync between the host and device, which is critical for reliable communication.  INTERFACE_RESET is then called when the command status (using GET_CM_STATUS) is later queries and returns an error, which clears the _protocol_ stall condition on the device.  This should prevent host/device data toggle PID mismatches, which previously required unplugging and replugging the device to resolve.

The logic to detect and match interfaces on a plugged device has also been modified.  The new algorithm start looking at interface 1 (not 0) when there is more than 1 interface on the device.  This prevents using interface 0 on multi-interface devices.  This is more compatible with stock BOOTSEL RP2040/RP2350 devices, but requires that for another device implementation with more than 1 interface, the picoboot interface must be on interface 1 or higher.  For reference, picotool uses simpler logic - if there is one interface it uses it (interface 0), and if there is more than one interface it uses interface 1.

## [0.1.0] - 2025-11-03

### Added

- Initial release of picoboot-webusb
- WebUSB implementation of PICOBOOT protocol
- Support for RP2040 and RP2350 targets
- Support for custom VID/PID targets
- High-level APIs for flash operations
- Low-level command APIs
- Comprehensive error handling
- Device discovery and connection management
- Example HTML application
- Full API documentation
- Console logging throughout

### Features

- Pure JavaScript ES6 modules
- No build step required
- No external dependencies
- Browser-based USB communication
- Flash read/write/erase operations
- Device reboot support
- XIP mode control
- Exclusive access management
- Configurable timeouts
