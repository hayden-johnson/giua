let languageLevel = '';
let interests = [];

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ languageLevel, interests });
});
