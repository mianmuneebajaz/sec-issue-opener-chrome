document.addEventListener('DOMContentLoaded', function() {
  const valueInput = document.getElementById('valueInput');
  const openButton = document.getElementById('openButton');
  const titleInput = document.getElementById('titleInput');
  const urlInput = document.getElementById('urlInput');
  const shortcutInput = document.getElementById('shortcutInput');
  const saveConfigButton = document.getElementById('saveConfigButton');
  const openShortcutsButton = document.getElementById('openShortcutsButton');
  const settingsButton = document.getElementById('settingsButton');
  const configSection = document.getElementById('configSection');
  const titleElement = document.querySelector('.title');
  const inputSection = document.querySelector('.input-section');
  const errorMessage = document.getElementById('errorMessage');
  const exampleElement = document.querySelector('.example');
  
  let currentBaseUrl = '';
  let configVisible = false;
  
  // Load saved configuration and current shortcut
  chrome.storage.sync.get(['extensionTitle', 'baseUrl'], function(result) {
    // Load title
    if (result.extensionTitle) {
      titleElement.textContent = result.extensionTitle;
      titleInput.value = result.extensionTitle; // Fix: Set the actual value in input
    } else {
      titleInput.value = 'Easy URL Opener'; // Fix: Set default value
    }
    
    // Load URL template
    if (result.baseUrl) {
      currentBaseUrl = result.baseUrl;
      urlInput.value = result.baseUrl; // Fix: Set the actual value in input
      showMainInterface();
      updateExample();
    } else {
      urlInput.value = ''; // Fix: Clear input if no URL is set
      showConfigurationRequired();
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

  function toggleConfiguration() {
    configVisible = !configVisible;
    if (configVisible) {
      configSection.style.display = 'block';
      settingsButton.innerHTML = '<span>⚙️ Hide Settings</span>';
    } else {
      configSection.style.display = 'none';
      settingsButton.innerHTML = '<span>⚙️ Settings</span>';
    }
  }

  function showConfigurationRequired() {
    inputSection.style.display = 'none';
    errorMessage.style.display = 'block';
    exampleElement.style.display = 'none';
    // Auto-show configuration when required
    configSection.style.display = 'block';
    configVisible = true;
    settingsButton.innerHTML = '<span>⚙️ Hide Settings</span>';
  }

  function showMainInterface() {
    inputSection.style.display = 'block';
    errorMessage.style.display = 'none';
    exampleElement.style.display = 'block';
    // Auto-focus the input field when interface is shown
    valueInput.focus();
  }

  function updateExample() {
    if (!currentBaseUrl || !currentBaseUrl.includes('{placeholder}')) {
      exampleElement.innerHTML = '<span class="example-label">Configure URL template to see examples</span>';
      return;
    }

    // Generate example based on URL template
    let exampleValue = '';
    let description = '';

    if (currentBaseUrl.includes('youtube.com')) {
      exampleValue = 'YnSK9Py44dg';
      description = '→ opens YouTube video';
    } else if (currentBaseUrl.includes('github.com')) {
      exampleValue = '123';
      description = '→ opens GitHub issue #123';
    } else if (currentBaseUrl.includes('atlassian.net') || currentBaseUrl.includes('jira')) {
      exampleValue = 'ABC-123';
      description = '→ opens JIRA ticket';
    } else {
      // Generic example
      exampleValue = 'example-value';
      description = '→ opens configured URL';
    }

    exampleElement.innerHTML = `
      <span class="example-label">Example:</span>
      <code>${exampleValue}</code> ${description}
    `;
  }

  function openUrl() {
    const value = valueInput.value.trim();
    
    if (!currentBaseUrl) {
      alert('Please configure the URL template first');
      return;
    }
    
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
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    
    if (!url) {
      alert('Please enter a URL template');
      return;
    }
    
    if (!url.includes('{placeholder}')) {
      alert('URL template must contain {placeholder}');
      return;
    }
    
    chrome.storage.sync.set({
      extensionTitle: title || 'Easy URL Opener',
      baseUrl: url
    }, function() {
      // Update the current session
      titleElement.textContent = title || 'Easy URL Opener';
      currentBaseUrl = url;
      
      // Show main interface if it was hidden
      showMainInterface();
      updateExample();
      
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

  // Handle settings button click
  settingsButton.addEventListener('click', function(event) {
    event.preventDefault();
    toggleConfiguration();
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

  // Update example when URL template changes
  urlInput.addEventListener('input', function() {
    if (this.value.includes('{placeholder}')) {
      currentBaseUrl = this.value;
      updateExample();
    }
  });
});
