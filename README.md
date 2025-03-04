# Global Google Meet Hotkeys

A Chrome extension that provides global hotkeys for Google Meet, allowing you to control your microphone and camera from anywhere on your computer.

## Motivation

This extension was born out of personal frustration with the limitations of the [google-meet-ptt](https://github.com/mahadevans87/google-meet-ptt) extension. I wanted a simple, reliable way to control my Meet sessions globally, regardless of which window or application was in focus.

## Features

- **Global Microphone Toggle** - Quick mute/unmute with `Ctrl+Shift+1`
- **Global Camera Toggle** - Turn camera on/off with `Ctrl+Shift+2`
- **Quick Meet Focus** - Switch to your Meet tab instantly with `Ctrl+Shift+6`
- **Jump to Bookmarked Meet** - Set your current meet as a bookmark with `Ctrl+Shift+7` and quickly open it anytime with the same hotkey.
- **Simple and Lightweight** - No bloat, just the essential controls you need
- **Works Everywhere** - Control your Meet session from any application

## Installation

1. Clone this repository
2. Load it as an unpacked extension in Chrome
3. Join a Google Meet session
4. Use the global hotkeys to control your meeting

## Important Note

When loading the extension as an unpacked extension in chrome the global-ness of the shortcuts gets disabled.
You can manually set them back by going to `chrome://extensions/shortcuts` and setting the three shortcuts to Global.

## License

MIT License

## Chrome Web Store

Soon.

## Firefox

Soon. Important note however is that [Firefox currently does not support global hotkeys](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/commands).

## Safari

Uhh. Probably not.
