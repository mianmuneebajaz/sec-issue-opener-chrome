
document.addEventListener('DOMContentLoaded', function() {
  const valueInput = document.getElementById('valueInput');
  const openButton = document.getElementById('openButton');
  const titleInput = document.getElementById('titleInput');
  const urlInput = document.getElementById('urlInput');
  const saveConfigButton = document.getElementById('saveConfigButton');
  const titleElement = document.querySelector('.title');
  
  let currentBaseUrl = 'https://www.youtube.com/watch?v={placeholder}';
  
  // Load saved configuration
  chrome.storage.sync.get(['extensionTitle', 'baseUrl'], function(result) {
    if (result.extensionTitle) {
      titleElement.textContent = result.extensionTitle;
      titleInput.value = result.extensionTitle;
    } else {
      titleInput.value = 'Easy URL Opener';
    }
    
    if (result.baseUrl) {
      currentBaseUrl = result.baseUrl;
      urlInput.value = result.baseUrl;
    } else {
      urlInput.value = 'https://www.youtube.com/watch?v={placeholder}';
    }
  });

  // Auto-focus the input field when popup opens
  valueInput.focus();

  function openUrl() {
    const value = valueInput.value.trim();
    
    if (value) {
      const url = currentBaseUrl.replace('{placeholder}', value);
      
      // Use Chrome extension API to open new tab
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.create({ url: url });
      } else {
        // Fallback for demo/preview
        window.open(url, '_blank');
      }
      
      // Clear the input for next use
      valueInput.value = '';
    }
  }

  function saveConfiguration() {
    const title = titleInput.value.trim() || 'Easy URL Opener';
    const url = urlInput.value.trim() || 'https://www.youtube.com/watch?v={placeholder}';
    
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
  valueInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      openUrl();
    }
  });

  // Handle button click
  openButton.addEventListener('click', function(event) {
    event.preventDefault();
    openUrl();
  });

  // Handle save configuration
  saveConfigButton.addEventListener('click', function(event) {
    event.preventDefault();
    saveConfiguration();
  });

  // Add subtle animation when typing
  valueInput.addEventListener('input', function() {
    if (this.value.trim()) {
      openButton.style.transform = 'scale(1.02)';
      setTimeout(() => {
        openButton.style.transform = '';
      }, 150);
    }
  });
});
