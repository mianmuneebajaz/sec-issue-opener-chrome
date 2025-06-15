// Create and inject the modal HTML
function createModal() {
  const modalHTML = `
    <div id="euo-modal-overlay" class="euo-modal-overlay" style="display: none;">
      <div class="euo-modal">
        <div class="euo-modal-header">
          <div class="euo-modal-header-content">
            <h2 id="euo-modal-title">Easy URL Opener</h2>
          </div>
          <button class="euo-modal-close" id="euo-modal-close">&times;</button>
        </div>
        <div class="euo-modal-body">
          <div class="euo-input-wrapper">
            <input
              type="text"
              id="euo-value-input"
              placeholder="Enter value"
              autocomplete="off"
              spellcheck="false"
            >
            <button id="euo-open-button" class="euo-open-btn">
              <span>Open</span>
            </button>
          </div>
          <div class="euo-example">
            <span class="euo-example-label">Loading...</span>
          </div>
          <div class="euo-shortcut-info">
            Press <kbd>Ctrl+Shift+U</kbd> to open this modal
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
}

// Modal functionality
function initModal() {
  const overlay = document.getElementById("euo-modal-overlay");
  const input = document.getElementById("euo-value-input");
  const openButton = document.getElementById("euo-open-button");
  const closeButton = document.getElementById("euo-modal-close");
  const titleElement = document.getElementById("euo-modal-title");
  const exampleElement = document.querySelector(".euo-example");

  let currentBaseUrl = "";

  function updateModalExample() {
    if (!currentBaseUrl || !currentBaseUrl.includes("{placeholder}")) {
      exampleElement.innerHTML =
        '<span class="euo-example-label" style="color:#b91c1c;">Please configure URL template in extension popup.</span>';
      return;
    }

    // Generate example based on URL template
    let exampleValue = "";
    let description = "";

    if (currentBaseUrl.includes("youtube.com")) {
      exampleValue = "YnSK9Py44dg";
      description = "→ opens YouTube video";
    } else if (currentBaseUrl.includes("github.com")) {
      exampleValue = "123";
      description = "→ opens GitHub issue #123";
    } else if (
      currentBaseUrl.includes("atlassian.net") ||
      currentBaseUrl.includes("jira")
    ) {
      exampleValue = "ABC-123";
      description = "→ opens JIRA ticket";
    } else {
      // Generic example
      exampleValue = "example-value";
      description = "→ opens configured URL";
    }

    exampleElement.innerHTML = `
      <span class="euo-example-label">Example:</span>
      <code>${exampleValue}</code> ${description}
    `;
  }

  function openUrl() {
    const value = input.value.trim();

    if (!currentBaseUrl) {
      alert("Please configure the URL template in the extension popup first.");
      return;
    }

    if (value) {
      const url = currentBaseUrl.replace("{placeholder}", value);
      window.open(url, "_blank");
      closeModal();
    }
  }

  function openModal() {
    // Reload configuration each time modal opens to get latest settings
    chrome.storage.sync.get(["extensionTitle", "baseUrl"], function (result) {
      if (result.extensionTitle) {
        titleElement.textContent = result.extensionTitle;
      }

      if (result.baseUrl) {
        currentBaseUrl = result.baseUrl;
      } else {
        currentBaseUrl = "";
      }
      updateModalExample();
    });

    overlay.style.display = "flex";
    input.focus();
    input.value = "";
  }

  function closeModal() {
    overlay.style.display = "none";
    input.value = "";
  }

  // Event listeners
  openButton.addEventListener("click", openUrl);
  closeButton.addEventListener("click", closeModal);

  // Handle Enter key
  input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      openUrl();
    }
  });

  // Handle Escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && overlay.style.display === "flex") {
      closeModal();
    }
  });

  // Close modal when clicking outside
  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      closeModal();
    }
  });

  // Listen for keyboard shortcut
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    if (request.action === "openModal") {
      openModal();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () {
    createModal();
    initModal();
  });
} else {
  createModal();
  initModal();
}
