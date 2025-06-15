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
    console.log('Loading saved config:', result);
    
    // Load title - fix the population issue
    const savedTitle = result.extensionTitle || 'Easy URL Opener';
    titleElement.textContent = savedTitle;
    titleInput.value = savedTitle;
    
    // Load URL template - fix the population issue
    if (result.baseUrl) {
      currentBaseUrl = result.baseUrl;
      urlInput.value = result.baseUrl;
      showMainInterface();
      updateExample();
    } else {
      urlInput.value = '';
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

  function showSuccessMessage(message) {
    // Create or update success message element
    let successElement = document.getElementById('successMessage');
    if (!successElement) {
      successElement = document.createElement('div');
      successElement.id = 'successMessage';
      successElement.className = 'success-message';
      successElement.style.cssText = `
        padding: 16px;
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 12px;
        margin: 16px;
        text-align: center;
        display: none;
      `;
      
      const successTitle = document.createElement('h3');
      successTitle.style.cssText = `
        font-size: 16px;
        font-weight: 600;
        color: #0369a1;
        margin-bottom: 8px;
      `;
      
      const successText = document.createElement('p');
      successText.style.cssText = `
        font-size: 13px;
        color: #0c4a6e;
        margin: 0;
      `;
      
      successElement.appendChild(successTitle);
      successElement.appendChild(successText);
      
      // Insert after error message
      errorMessage.parentNode.insertBefore(successElement, errorMessage.nextSibling);
    }
    
    const titleEl = successElement.querySelector('h3');
    const textEl = successElement.querySelector('p');
    
    titleEl.textContent = 'Configuration Saved';
    textEl.textContent = message;
    
    // Hide other messages and show success
    errorMessage.style.display = 'none';
    successElement.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
      successElement.style.display = 'none';
    }, 3000);
  }

  function showErrorMessage(message) {
    // Create or update error message element in content area
    let configErrorElement = document.getElementById('configErrorMessage');
    if (!configErrorElement) {
      configErrorElement = document.createElement('div');
      configErrorElement.id = 'configErrorMessage';
      configErrorElement.className = 'config-error-message';
      configErrorElement.style.cssText = `
        padding: 16px;
        background: #fef2f2;
        border: 1px solid #fecaca;
        border-radius: 12px;
        margin: 16px;
        text-align: center;
        display: none;
      `;
      
      const errorTitle = document.createElement('h3');
      errorTitle.style.cssText = `
        font-size: 16px;
        font-weight: 600;
        color: #dc2626;
        margin-bottom: 8px;
      `;
      
      const errorText = document.createElement('p');
      errorText.style.cssText = `
        font-size: 13px;
        color: #7f1d1d;
        margin: 0;
      `;
      
      configErrorElement.appendChild(errorTitle);
      configErrorElement.appendChild(errorText);
      
      // Insert after error message
      errorMessage.parentNode.insertBefore(configErrorElement, errorMessage.nextSibling);
    }
    
    const titleEl = configErrorElement.querySelector('h3');
    const textEl = configErrorElement.querySelector('p');
    
    titleEl.textContent = 'Configuration Error';
    textEl.textContent = message;
    
    // Hide success message and show error
    const successMessage = document.getElementById('successMessage');
    if (successMessage) successMessage.style.display = 'none';
    configErrorElement.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      configErrorElement.style.display = 'none';
    }, 5000);
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
      showErrorMessage('Please configure the URL template first');
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
      showErrorMessage('Please enter a URL template');
      return;
    }
    
    if (!url.includes('{placeholder}')) {
      showErrorMessage('URL template must contain {placeholder}');
      return;
    }
    
    const finalTitle = title || 'Easy URL Opener';
    
    chrome.storage.sync.set({
      extensionTitle: finalTitle,
      baseUrl: url
    }, function() {
      console.log('Configuration saved:', { title: finalTitle, url: url });
      
      // Update the current session
      titleElement.textContent = finalTitle;
      currentBaseUrl = url;
      
      // Show main interface if it was hidden
      showMainInterface();
      updateExample();
      
      // Show success message
      showSuccessMessage('Your configuration has been saved successfully!');
      
      // Hide settings after successful save
      configSection.style.display = 'none';
      configVisible = false;
      settingsButton.innerHTML = '<span>⚙️ Settings</span>';
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
