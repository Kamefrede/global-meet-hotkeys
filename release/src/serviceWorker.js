import { COMMANDS_ENUM, MESSAGE_TYPE_ENUM, TOGGLE_MESSAGE_VALUE_ENUM, error } from './common.js';

chrome.commands.onCommand.addListener(async (command) => {
  const meetTab = await getMeetTab();

  if (meetTab === undefined || meetTab.id === undefined || meetTab.sessionId !== undefined) {
    error('no meet tabs currently open');
    return;
  }

  switch (command) {
    case COMMANDS_ENUM.TOGGLE_MIC:
      return chrome.tabs.sendMessage(meetTab.id, {
        type: MESSAGE_TYPE_ENUM.TOGGLE,
        value: TOGGLE_MESSAGE_VALUE_ENUM.MIC,
      });
    case COMMANDS_ENUM.TOGGLE_CAMERA:
      return chrome.tabs.sendMessage(meetTab.id, {
        type: MESSAGE_TYPE_ENUM.TOGGLE,
        value: TOGGLE_MESSAGE_VALUE_ENUM.CAMERA,
      });
    case COMMANDS_ENUM.FOCUS_MEET:
      return chrome.tabs.highlight({ windowId: meetTab.windowId, tabs: [meetTab.index] });
    default:
      error(`invalid command ${command} received`);
      return;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (sender.id != chrome.runtime.id || message?.type !== 'setMeetTab') {
    sendResponse();
    return false;
  }

  chrome.storage.local
    .set({ meetTabId: sender.tab?.id })
    .then(sendResponse)
    .catch((e) => error(`failed to set meet tab to local storage ${e}`));

  return true;
});

/**
 *
 * @returns {Promise<chrome.tabs.Tab | undefined>}
 */

const getMeetTab = async () => {
  const { meetTabId } = await chrome.storage.local.get(['meetTabId']);

  if (!meetTabId) {
    return;
  }

  try {
    const tab = await chrome.tabs.get(meetTabId);

    return tab;
  } catch (e) {
    return;
  }
};
