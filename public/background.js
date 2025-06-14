
// Handle keyboard shortcuts
chrome.commands.onCommand.addListener(function(command) {
  if (command === 'open-sec-modal') {
    // Send message to the active tab to open the modal
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, {action: 'openModal'});
      }
    });
  }
});

// Handle installation
chrome.runtime.onInstalled.addListener(function() {
  console.log('SEC Issue Opener extension installed');
});
