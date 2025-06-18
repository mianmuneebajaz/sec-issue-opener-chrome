# 🚀 Easy URL Opener - Lightning Fast URL Navigation

**Transform the way you navigate to frequently used URLs with dynamic parameters**

Easy URL Opener is a powerful, configurable Chrome extension designed for developers, support teams, and anyone who regularly accesses URLs with dynamic parameters. Say goodbye to bookmarking dozens of similar URLs or typing the same base URL repeatedly.

## ✨ Key Features

- **🎯 Configurable URL Templates** - Set up any URL pattern with `{placeholder}` variables
- **⚡ Lightning Fast Access** - Auto-focused input field for instant typing
- **🔧 Fully Customizable** - Personalize extension title and URL templates
- **🛡️ Secure & Lightweight** - Built with Manifest V3 for maximum security
- **💡 Smart Examples** - Contextual examples based on your URL templates

## 🎯 Perfect For

### Development Teams

- **JIRA Issues**: `https://company.atlassian.net/browse/PROJ-{placeholder}`
- **GitHub Repositories**: `https://github.com/org/{placeholder}`
- **Pull Requests**: `https://github.com/org/repo/pull/{placeholder}`
- **Jenkins Builds**: `https://jenkins.company.com/job/{placeholder}`

### Support & Operations

- **Support Tickets**: `https://helpdesk.company.com/ticket/{placeholder}`
- **Customer Profiles**: `https://admin.company.com/users/{placeholder}`
- **Monitoring Dashboards**: `https://monitoring.company.com/host/{placeholder}`

## 🚀 How It Works

1. **Install & Configure** - Set your URL template with `{placeholder}` where the dynamic part goes
2. **Quick Access** - Click the extension icon to open the popup
3. **Type & Go** - Enter your value and press Enter or click Open
4. **Instant Navigation** - Opens in a new tab automatically

## 📝 Example Usage

With template: `https://mycompany.atlassian.net/browse/SEC-{placeholder}`

- Type: `1234`
- Opens: `https://mycompany.atlassian.net/browse/SEC-1234`

## 🔒 Privacy & Security

- **Minimal Permissions** - Only requests necessary permissions for tab management
- **No Data Collection** - Your URL templates are stored locally in Chrome
- **Open Source** - Transparent development and community-driven improvements
- **Manifest V3** - Built with the latest Chrome extension standards

## ⚙️ Easy Setup

1. Install the extension
2. Click the extension icon to open the popup
3. Configure your URL template (e.g., `https://example.com/item/{placeholder}`)
4. Set a custom title (optional)
5. For faster access, configure a keyboard shortcut for the extension in Chrome:
   - Go to `chrome://extensions/shortcuts` or navigate to Chrome Extensions > Manage Extensions > Keyboard Shortcuts
   - Find "Easy URL Opener" and set a keyboard shortcut for "Activate the extension"
   - This allows you to open the popup directly with your keyboard
6. Start using immediately!

## 🎨 Modern Design

- Clean, intuitive interface
- Responsive design that works perfectly in the Chrome toolbar
- Auto-focused input for immediate typing
- Visual feedback and smooth animations

# Ideas

- A screenshot shortcut

## 🔐 Permission Justifications

### Tabs Permission

Our extension requires the `tabs` permission to open new tabs with the generated URLs. When you enter a value and submit the form, we need this permission to create a new tab with your dynamically constructed URL.

### Active Tab Permission

The `activeTab` permission is used to focus the newly created tab after navigation. This provides a seamless user experience by automatically bringing your generated URL to focus after creation.

### Storage Permission

We use the `storage` permission to save your customized URL templates and extension preferences locally. This ensures your configuration persists between browser sessions without requiring you to reconfigure the extension each time.
