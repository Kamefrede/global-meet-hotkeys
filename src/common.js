export const COMMANDS_ENUM = {
  TOGGLE_MIC: 'toggleMic',
  TOGGLE_CAMERA: 'toggleCamera',
  FOCUS_MEET: 'focusMeet',
};

export const MESSAGE_TYPE_ENUM = {
  TOGGLE: 'toggle',
  SET_MEET_TAB: 'setMeetTab',
};

export const TOGGLE_MESSAGE_VALUE_ENUM = {
  MIC: 'mic',
  CAMERA: 'camera',
};

/**
 *
 * @param {(...args: any[]) => any} callback
 * @param {Number} wait
 *
 * @returns {callback} A debounced version of the callback function
 */

export const debounce = (callback, wait) => {
  /**
   * @type {number | undefined}
   */
  let timeoutId = undefined;

  return (...args) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

/**
 *
 * @param {string} message
 */

export const log = (message) => {
  console.log(`[google-meet-hotkeys] ${message}`);
};

/**
 *
 * @param {string} message
 */

export const error = (message) => {
  console.log(`[google-meet-hotkeys] ${message}`);
};

/**
 *
 * @returns {typeof browser}
 */

export const getBrowser = () => {
  if (typeof browser === 'undefined') {
    // @ts-ignore
    return chrome;
  }
  return browser;
};

export const DEBOUNCE_INTERVAL_MS = 200;
