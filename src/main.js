'use strict';

/**
 *
 * @returns {typeof browser}
 */

const getBrowser = () => {
  if (typeof browser === 'undefined') {
    // @ts-ignore
    return chrome;
  }
  return browser;
};

(async () => {
  const browser = getBrowser();
  const src = browser.runtime.getURL('src/common.js');

  /**
   *  @type {typeof import('src/common.js')}
   */

  const { MESSAGE_TYPE_ENUM, TOGGLE_MESSAGE_VALUE_ENUM, debounce, log, DEBOUNCE_INTERVAL_MS } =
    await import(src);

  /**
   * @typedef {Object} Message
   * @property {MESSAGE_TYPE_ENUM[keyof MESSAGE_TYPE_ENUM]} type
   * @property {TOGGLE_MESSAGE_VALUE_ENUM[keyof TOGGLE_MESSAGE_VALUE_ENUM]} value
   */

  /**
   * @callback  Listener
   * @param {Message} message - The message received.
   * @param {browser.runtime.MessageSender} sender - The sender of the message.
   * @param {function(): void} sendResponse - Function to send a response.
   * @returns {boolean | undefined}
   */

  /**
   *
   * @param {MutationObserver} observer
   */

  const waitForMuteButtons = (observer) => {
    /**
     * This takes advantage that the mute buttons on the lobby screen are divs and not real buttons.
     * @type {NodeListOf<HTMLButtonElement>}
     */

    const muteButtons = document.querySelectorAll('button[data-is-muted]');

    if (muteButtons.length < 2) {
      return;
    }

    const micButton = muteButtons.item(0);
    const cameraButton = muteButtons.item(1);

    log('Hooked into the mute buttons!');

    observer.disconnect();

    browser.runtime.sendMessage(browser.runtime.id, {
      type: MESSAGE_TYPE_ENUM.SET_MEET_TAB,
    });

    const listeners = [
      setupWorkerEventListeners(
        TOGGLE_MESSAGE_VALUE_ENUM.MIC,
        debounce(() => micButton.click(), DEBOUNCE_INTERVAL_MS),
      ),
      setupWorkerEventListeners(
        TOGGLE_MESSAGE_VALUE_ENUM.CAMERA,
        debounce(() => cameraButton.click(), DEBOUNCE_INTERVAL_MS),
      ),
    ];

    setupMeetingDisconnectObserver(listeners);
  };

  /**
   *
   * @param {Listener[]} listeners
   */

  const setupMeetingDisconnectObserver = (listeners) => {
    const observer = new MutationObserver(() => {
      const muteButtons = document.querySelectorAll('button[data-is-muted]');

      if (muteButtons.length !== 0) {
        return;
      }

      observer.disconnect();

      for (const listener of listeners) {
        browser.runtime.onMessage.removeListener(listener);
      }

      log('Disconnected from meeting!');

      setTimeout(initializeExtension, 500);

      return;
    });

    observer.observe(document.body, { childList: true, subtree: true });
  };

  /**
   *
   * @param {Message["value"]} name
   * @param {() => void} onEvent
   */

  const setupWorkerEventListeners = (name, onEvent) => {
    /**
     * @type Listener
     */
    const listener = (message, sender, sendResponse) => {
      sendResponse();

      if (
        sender.id == browser.runtime.id &&
        message?.type === MESSAGE_TYPE_ENUM.TOGGLE &&
        message?.value === name
      ) {
        onEvent();
      }

      return false;
    };

    browser.runtime.onMessage.addListener(listener);

    return listener;
  };

  const initializeExtension = () => {
    const observer = new MutationObserver(() => waitForMuteButtons(observer));

    observer.observe(document.body, { childList: true, subtree: true });
  };

  initializeExtension();
})();
