document.addEventListener("DOMContentLoaded", function () {
  const valueInput = document.getElementById("valueInput");
  const openButton = document.getElementById("openButton");
  const titleInput = document.getElementById("titleInput");
  const urlInput = document.getElementById("urlInput");
  const saveConfigButton = document.getElementById("saveConfigButton");
  const settingsButton = document.getElementById("settingsButton");
  const configSection = document.getElementById("configSection");
  const titleElement =
    document.querySelector(".title") || document.querySelector(".header h1");
  const inputSection = document.querySelector(".input-section");
  const errorMessage = document.getElementById("errorMessage");
  const exampleElement = document.querySelector(".example");
  const notificationArea = document.getElementById("notificationArea");

  let currentBaseUrl = "";
  let configVisible = false;

  // Load saved configuration and current shortcut
  chrome.storage.sync.get(["extensionTitle", "baseUrl"], function (result) {
    console.log("Loading saved config:", result);

    // Load title - fix the population issue
    const savedTitle = result.extensionTitle || "Easy URL Opener";
    if (titleElement) {
      titleElement.textContent = savedTitle;
    }
    titleInput.value = savedTitle;

    // Load URL template - fix the population issue
    if (result.baseUrl) {
      currentBaseUrl = result.baseUrl;
      urlInput.value = result.baseUrl;
      showMainInterface();
      updateExample();
    } else {
      urlInput.value = "";
      showConfigurationRequired();
    }
  });

  function toggleConfiguration() {
    configVisible = !configVisible;
    if (configVisible) {
      configSection.style.display = "block";
      settingsButton.innerHTML = "<span>⚙️ Hide Settings</span>";
    } else {
      configSection.style.display = "none";
      settingsButton.innerHTML = "<span>⚙️ Settings</span>";
    }
  }

  function showConfigurationRequired() {
    inputSection.style.display = "none";
    showNotification(
      "Configuration Required",
      "Please configure your URL template below to start using the extension.",
      "error"
    );
    exampleElement.style.display = "none";
    // Auto-show configuration when required
    configSection.style.display = "block";
    configVisible = true;
    settingsButton.innerHTML = "<span>⚙️ Hide Settings</span>";
  }

  function showMainInterface() {
    inputSection.style.display = "block";
    clearNotifications();
    exampleElement.style.display = "block";
    // Auto-focus the input field when interface is shown
    valueInput.focus();
  }

  function showNotification(title, message, type = "error") {
    clearNotifications();

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    const titleEl = document.createElement("h3");
    titleEl.textContent = title;

    const messageEl = document.createElement("p");
    messageEl.textContent = message;

    notification.appendChild(titleEl);
    notification.appendChild(messageEl);
    notificationArea.appendChild(notification);

    // Auto-hide after a delay
    const hideDelay = type === "success" ? 3000 : 5000;
    setTimeout(() => {
      if (notification.parentNode === notificationArea) {
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-10px)";
        setTimeout(() => {
          if (notification.parentNode === notificationArea) {
            notificationArea.removeChild(notification);
          }
        }, 300);
      }
    }, hideDelay);
  }

  function clearNotifications() {
    while (notificationArea.firstChild) {
      notificationArea.removeChild(notificationArea.firstChild);
    }
  }

  function showSuccessMessage(message) {
    showNotification("Configuration Saved", message, "success");
  }

  function showErrorMessage(message) {
    showNotification("Error", message, "error");
  }

  function updateExample() {
    if (!currentBaseUrl || !currentBaseUrl.includes("{placeholder}")) {
      exampleElement.innerHTML =
        '<span class="example-label">Configure URL template to see examples</span>';
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
      <span class="example-label">Example:</span>
      <code>${exampleValue}</code> ${description}
    `;
  }

  function openUrl() {
    const value = valueInput.value.trim();

    if (!currentBaseUrl) {
      showErrorMessage("Please configure the URL template first");
      return;
    }

    if (value) {
      const url = currentBaseUrl.replace("{placeholder}", value);

      // Use Chrome extension API to open new tab
      if (typeof chrome !== "undefined" && chrome.tabs) {
        chrome.tabs.create({ url: url });
      } else {
        // Fallback for demo/preview
        window.open(url, "_blank");
      }

      // Clear the input for next use
      valueInput.value = "";
    }
  }

  function saveConfiguration() {
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();

    if (!url) {
      showErrorMessage("Please enter a URL template");
      return;
    }

    if (!url.includes("{placeholder}")) {
      showErrorMessage("URL template must contain {placeholder}");
      return;
    }

    const finalTitle = title || "Easy URL Opener";

    chrome.storage.sync.set(
      {
        extensionTitle: finalTitle,
        baseUrl: url,
      },
      function () {
        console.log("Configuration saved:", { title: finalTitle, url: url });

        // Update the current session
        if (titleElement) {
          titleElement.textContent = finalTitle;
        }
        currentBaseUrl = url;

        // Show main interface if it was hidden
        showMainInterface();
        updateExample();

        // Show success message
        showSuccessMessage("Your configuration has been saved successfully!");

        // Hide settings after successful save
        configSection.style.display = "none";
        configVisible = false;
        settingsButton.innerHTML = "<span>⚙️ Settings</span>";
      }
    );
  }

  // Handle Enter key press
  valueInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      openUrl();
    }
  });

  // Handle button click
  openButton.addEventListener("click", function (event) {
    event.preventDefault();
    openUrl();
  });

  // Handle save configuration
  saveConfigButton.addEventListener("click", function (event) {
    event.preventDefault();
    saveConfiguration();
  });

  // Handle settings button click
  settingsButton.addEventListener("click", function (event) {
    event.preventDefault();
    toggleConfiguration();
  });

  // Add subtle animation when typing
  valueInput.addEventListener("input", function () {
    if (this.value.trim()) {
      openButton.style.transform = "scale(1.02)";
      setTimeout(() => {
        openButton.style.transform = "";
      }, 150);
    }
  });

  // Update example when URL template changes
  urlInput.addEventListener("input", function () {
    if (this.value.includes("{placeholder}")) {
      currentBaseUrl = this.value;
      updateExample();
    }
  });
});
