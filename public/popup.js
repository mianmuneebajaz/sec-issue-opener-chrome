
document.addEventListener('DOMContentLoaded', function() {
  const issueInput = document.getElementById('issueNumber');
  const openButton = document.getElementById('openButton');
  const baseUrl = 'https://shuttlehealth.atlassian.net/browse/SEC-';

  // Auto-focus the input field when popup opens
  issueInput.focus();

  function openIssue() {
    const issueNumber = issueInput.value.trim();
    
    if (issueNumber) {
      const url = baseUrl + issueNumber;
      
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
