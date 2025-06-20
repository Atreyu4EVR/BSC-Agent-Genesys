/**
 * n8n Chat Configuration
 *
 * This file contains configuration options for the n8n chat widget.
 * Modify the values below to customize your chat experience.
 */

window.n8nChatConfig = {
  /**
   * REQUIRED: Your n8n webhook URL
   * Replace this with your actual n8n webhook URL
   *
   * Examples:
   * - Production: 'https://yourname.app.n8n.cloud/webhook/513107b3-6f3a-4a1e-af21-659f0ed14183'
   * - Local: 'http://localhost:5678/webhook/513107b3-6f3a-4a1e-af21-659f0ed14183'
   */
  webhookUrl:
    "https://byui.app.n8n.cloud/webhook/13348d82-88d3-447e-90d4-7b6db9f79280/chat",

  /**
   * Chat display mode
   * - 'fullscreen': Takes up the entire container (recommended for iframe)
   * - 'window': Shows as a chat bubble with popup window
   */
  mode: "fullscreen",

  /**
   * Show welcome screen before starting chat
   */
  showWelcomeScreen: true,

  /**
   * Target element for iframe compatibility
   */
  target: "#n8n-chat",

  /**
   * Keys for sending data to your n8n workflow
   */
  chatInputKey: "chatInput",
  chatSessionKey: "sessionId",

  /**
   * Language setting
   */
  defaultLanguage: "en",

  /**
   * Initial messages displayed when chat starts
   */
  initialMessages: ["Hello! 👋 I'm the BSC Agent. How can I help you today?"],

  /**
   * Internationalization settings
   */
  i18n: {
    en: {
      title: "BSC Agent 💬",
      subtitle: "powered by an advanced AI Agent",
      footer: "",
      getStarted: "Start",
      inputPlaceholder: "Type your message here...",
    },
  },

  /**
   * HTTP configuration for webhook requests
   */
  webhookConfig: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  },

  /**
   * Additional metadata sent with each request
   * This can be used in your n8n workflow for routing or analytics
   */
  metadata: {
    source: "genesys-cloud-iframe",
    userAgent: navigator.userAgent,
    timestamp: new Date().toISOString(),
    // Add any other metadata you need
    // clientId: 'your-client-id',
    // department: 'support',
    // priority: 'normal'
  },

  /**
   * Custom CSS variables for styling
   * These override the default theme colors
   */
  customStyles: {
    // Primary colors (main brand color)
    "--chat--color-primary": "#0066cc",
    "--chat--color-primary-shade-50": "#0052a3",
    "--chat--color-primary-shade-100": "#003d7a",

    // Secondary colors (accent color)
    "--chat--color-secondary": "#28a745",
    "--chat--color-secondary-shade-50": "#1e7e34",

    // Background and text colors
    "--chat--color-white": "#ffffff",
    "--chat--color-light": "#f8f9fa",
    "--chat--color-dark": "#343a40",

    // Chat window dimensions (for fullscreen mode, these should be 100%)
    "--chat--window--width": "100%",
    "--chat--window--height": "100%",

    // Typography
    "--chat--heading--font-size": "1.25rem",
    "--chat--message--font-size": "0.875rem",

    // Input area
    "--chat--textarea--height": "60px",

    // Spacing and borders
    "--chat--spacing": "1rem",
    "--chat--border-radius": "0.375rem",
  },
};

/**
 * Genesys Cloud specific configuration
 * These settings are optimized for use within Genesys Cloud iframes
 */
window.genesysCloudConfig = {
  /**
   * Enable iframe communication with Genesys Cloud
   */
  enableGenesysIntegration: true,

  /**
   * Events to send to Genesys Cloud parent window
   */
  genesysEvents: {
    chatReady: true,
    messageReceived: true,
    messageSent: true,
    chatStarted: true,
    chatEnded: true,
  },

  /**
   * Function to send events to Genesys Cloud
   */
  sendGenesysEvent: function (eventType, data) {
    if (window.parent !== window && this.genesysEvents[eventType]) {
      window.parent.postMessage(
        {
          type: "n8nChat_" + eventType,
          data: data,
          timestamp: new Date().toISOString(),
        },
        "*"
      );
    }
  },
};

/**
 * Environment-based configuration
 * Automatically detects environment and adjusts settings
 */
window.environmentConfig = {
  /**
   * Detect if running in development mode
   */
  isDevelopment: function () {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "file:"
    );
  },

  /**
   * Get environment-specific settings
   */
  getEnvironmentSettings: function () {
    if (this.isDevelopment()) {
      return {
        debug: true,
        logLevel: "verbose",
        enableConsoleLogging: true,
      };
    } else {
      return {
        debug: false,
        logLevel: "error",
        enableConsoleLogging: false,
      };
    }
  },
};
