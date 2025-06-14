// Create and inject the modal HTML
function createModal() {
  const modalHTML = `
    <div id="sec-modal-overlay" class="sec-modal-overlay" style="display: none;">
      <div class="sec-modal">
        <div class="sec-modal-header">
          <h2 id="sec-modal-title">Open SEC Issue</h2>
          <button class="sec-modal-close" id="sec-modal-close">&times;</button>
        </div>
        <div class="sec-modal-body">
          <div class="sec-input-wrapper">
            <input 
              type="text" 
              id="sec-issue-input" 
              placeholder="Enter issue number"
              autocomplete="off"
              spellcheck="false"
            >
            <button id="sec-open-button" class="sec-open-btn">
              <span>Open</span>
            </button>
          </div>
          <div class="sec-example">
            <span class="sec-example-label">Example:</span>
            <code>1332</code>
          </div>
          <div class="sec-shortcut-info">
            Press <kbd>Ctrl+Shift+S</kbd> to open this modal
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Modal functionality
function initModal() {
  const overlay = document.getElementById('sec-modal-overlay');
  const input = document.getElementById('sec-issue-input');
  const openButton = document.getElementById('sec-open-button');
  const closeButton = document.getElementById('sec-modal-close');
  const titleElement = document.getElementById('sec-modal-title');
  
  let currentBaseUrl = 'https://shuttlehealth.atlassian.net/browse/SEC-{issue}';
  
  // Load saved configuration
  chrome.storage.sync.get(['extensionTitle', 'baseUrl'], function(result) {
    if (result.extensionTitle) {
      titleElement.textContent = result.extensionTitle;
    }
    
    if (result.baseUrl) {
      currentBaseUrl = result.baseUrl;
    }
  });

  function openIssue() {
    const issueNumber = input.value.trim();
    
    if (issueNumber) {
      const url = currentBaseUrl.replace('{issue}', issueNumber);
      window.open(url, '_blank');
      closeModal();
    }
  }

  function openModal() {
    // Reload configuration each time modal opens to get latest settings
    chrome.storage.sync.get(['extensionTitle', 'baseUrl'], function(result) {
      if (result.extensionTitle) {
        titleElement.textContent = result.extensionTitle;
      }
      
      if (result.baseUrl) {
        currentBaseUrl = result.baseUrl;
      }
    });
    
    overlay.style.display = 'flex';
    input.focus();
    input.value = '';
  }

  function closeModal() {
    overlay.style.display = 'none';
    input.value = '';
  }

  // Event listeners
  openButton.addEventListener('click', openIssue);
  closeButton.addEventListener('click', closeModal);
  
  // Handle Enter key
  input.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      openIssue();
    }
  });

  // Handle Escape key
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && overlay.style.display === 'flex') {
      closeModal();
    }
  });

  // Close modal when clicking outside
  overlay.addEventListener('click', function(event) {
    if (event.target === overlay) {
      closeModal();
    }
  });

  // Listen for keyboard shortcut
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'openModal') {
      openModal();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', function() {
    createModal();
    initModal();
  });
} else {
  createModal();
  initModal();
}
