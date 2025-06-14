
document.addEventListener('DOMContentLoaded', function() {
  const valueInput = document.getElementById('valueInput');
  const openButton = document.getElementById('openButton');
  const titleInput = document.getElementById('titleInput');
  const urlInput = document.getElementById('urlInput');
  const shortcutInput = document.getElementById('shortcutInput');
  const saveConfigButton = document.getElementById('saveConfigButton');
  const openShortcutsButton = document.getElementById('openShortcutsButton');
  const titleElement = document.querySelector('.title');
  
  let currentBaseUrl = 'https://www.youtube.com/watch?v={placeholder}';
  
  // Load saved configuration and current shortcut
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

  // Load current keyboard shortcut
  chrome.commands.getAll(function(commands) {
    const openModalCommand = commands.find(cmd => cmd.name === 'open-url-modal');
    if (openModalCommand && openModalCommand.shortcut) {
      shortcutInput.value = openModalCommand.shortcut;
    } else {
      shortcutInput.value = 'Not set';
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

  function openShortcutsPage() {
    chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
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

  // Handle open shortcuts page
  openShortcutsButton.addEventListener('click', function(event) {
    event.preventDefault();
    openShortcutsPage();
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
