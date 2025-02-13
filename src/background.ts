import browser from 'webextension-polyfill'


// Main message listener
browser.runtime.onMessage.addListener((request: any, _sender: any, sendResponse: any) => {
  switch (request.type) {
  
  case 'extensionPages':
    browser.tabs.query({}).then(function (tabs) {
      for (let tab of tabs) {
        if (tab.url?.includes('chrome-extension://')) {
          browser.tabs.sendMessage(tab.id!, request);
        }
      }
    });
    break;
  
  case 'currentTab':
    browser.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
      browser.tabs.sendMessage(tabs[0].id!, request).then(function (response) {
        sendResponse(response);
      });
    });
    return true;
  
  
      
  default:
    console.log('Unknown request type');
  }
});
