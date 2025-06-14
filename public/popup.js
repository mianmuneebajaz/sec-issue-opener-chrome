
document.addEventListener('DOMContentLoaded', function() {
  const issueInput = document.getElementById('issueNumber');
  const openButton = document.getElementById('openButton');
  const titleInput = document.getElementById('titleInput');
  const urlInput = document.getElementById('urlInput');
  const saveConfigButton = document.getElementById('saveConfigButton');
  const titleElement = document.querySelector('.title');
  
  let currentBaseUrl = 'https://shuttlehealth.atlassian.net/browse/SEC-{issue}';
  
  // Load saved configuration
  chrome.storage.sync.get(['extensionTitle', 'baseUrl'], function(result) {
    if (result.extensionTitle) {
      titleElement.textContent = result.extensionTitle;
      titleInput.value = result.extensionTitle;
    } else {
      titleInput.value = 'Open SEC Issue';
    }
    
    if (result.baseUrl) {
      currentBaseUrl = result.baseUrl;
      urlInput.value = result.baseUrl;
    } else {
      urlInput.value = 'https://shuttlehealth.atlassian.net/browse/SEC-{issue}';
    }
  });

  // Auto-focus the input field when popup opens
  issueInput.focus();

  function openIssue() {
    const issueNumber = issueInput.value.trim();
    
    if (issueNumber) {
      const url = currentBaseUrl.replace('{issue}', issueNumber);
      
      // Use Chrome extension API to open new tab
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: url });
      } else {
        // Fallback for demo/preview
        window.open(url, '_blank');
      }
      
      // Clear the input for next use
      issueInput.value = '';
    }
  }

  function saveConfiguration() {
    const title = titleInput.value.trim() || 'Open SEC Issue';
    const url = urlInput.value.trim() || 'https://shuttlehealth.atlassian.net/browse/SEC-{issue}';
    
    chrome.storage.sync.set({
      extensionTitle: title,
      baseUrl: url
    }, function() {
      // Update the current session
      titleElement.textContent = title;
      currentBaseUrl = url;
      
      // Visual feedback
      saveConfigButton.textContent = 'Saved!';
      saveConfigButton.style.background = '#22c55e';
      
      setTimeout(() => {
        saveConfigButton.textContent = 'Save Configuration';
        saveConfigButton.style.background = '#64748b';
      }, 1500);
    });
  }

  // Handle Enter key press
  issueInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      openIssue();
    }
  });

  // Handle button click
  openButton.addEventListener('click', function(event) {
    event.preventDefault();
    openIssue();
  });

  // Handle save configuration
  saveConfigButton.addEventListener('click', function(event) {
    event.preventDefault();
    saveConfiguration();
  });

  // Add subtle animation when typing
  issueInput.addEventListener('input', function() {
    if (this.value.trim()) {
      openButton.style.transform = 'scale(1.02)';
      setTimeout(() => {
        openButton.style.transform = '';
      }, 150);
    }
  });
});
