# n8n Chat UI for Genesys Cloud

This project provides a client-side web chat interface using the [n8n chat widget](https://www.npmjs.com/package/@n8n/chat) that can be embedded in Genesys Cloud via an iframe. It offers a seamless integration between n8n's workflow automation platform and Genesys Cloud's customer engagement platform.

## 🚀 Features

- **Iframe-Ready**: Optimized for embedding and loading in Genesys Cloud iframes
- **Fully Configurable**: Easy configuration through external config file
- **Error Handling**: Robust error handling with user-friendly messages
- **Status Indicators**: Visual status indicators for connection state
- **Genesys Integration**: Built-in communication with Genesys Cloud parent window
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Smooth loading experience with spinner and progress indicators
- **CDN-Based**: No build process required, uses CDN for n8n chat widget

## 📁 Project Structure

```
n8nChatUI/
├── index.html          # Simple implementation (standalone)
├── chat.html           # Enhanced implementation with external config
├── config.js           # Configuration file
└── README.md           # This file
```

## 🛠️ Setup Instructions

### Prerequisites

1. **n8n Instance**: You need a running n8n instance (cloud or self-hosted)
2. **n8n Workflow**: Create a workflow with a **Chat Trigger** node
3. **Webhook URL**: Get the webhook URL from your Chat Trigger node
4. **Web Server**: A web server to host the HTML files

### Step 1: Configure n8n Workflow

1. Create a new workflow in n8n
2. Add a **Chat Trigger** node
3. In the Chat Trigger node settings:
   - Add your domain to the **Allowed Origins (CORS)** field
   - Note the webhook URL provided
4. Add your AI/automation logic after the Chat Trigger
5. **Activate the workflow**

### Step 2: Configure the Chat UI

1. Edit `config.js` and update the `webhookUrl`:

   ```javascript
   webhookUrl: "https://yourname.app.n8n.cloud/webhook/YOUR-WEBHOOK-ID";
   ```

2. Customize other settings as needed:
   ```javascript
   // Example customizations
   initialMessages: [
       'Welcome to our support chat! 👋',
       'How can we help you today?'
   ],
   i18n: {
       en: {
           title: 'Customer Support',
           subtitle: 'We\'re here to help you 24/7',
           inputPlaceholder: 'Type your message...'
       }
   }
   ```

### Step 3: Deploy the Files

1. Upload `chat.html` and `config.js` to your web server
2. Ensure both files are in the same directory
3. Test by accessing `https://yourdomain.com/chat.html`

### Step 4: Configure Genesys Cloud

1. In Genesys Cloud, create a new **Client App**
2. Set the app URL to your deployed chat interface:
   ```
   https://yourdomain.com/chat.html
   ```
3. Configure the iframe dimensions (recommended: 400px width, 600px height)

## 🔧 Configuration Options

### Basic Configuration

| Option              | Type    | Default        | Description                                 |
| ------------------- | ------- | -------------- | ------------------------------------------- |
| `webhookUrl`        | string  | Required       | Your n8n webhook URL                        |
| `mode`              | string  | `'fullscreen'` | Display mode (`'fullscreen'` or `'window'`) |
| `showWelcomeScreen` | boolean | `true`         | Show welcome screen                         |
| `chatInputKey`      | string  | `'chatInput'`  | Key for chat input in n8n                   |
| `chatSessionKey`    | string  | `'sessionId'`  | Key for session ID in n8n                   |

### Advanced Configuration

```javascript
// Custom styling
customStyles: {
    '--chat--color-primary': '#your-brand-color',
    '--chat--color-secondary': '#your-accent-color',
    '--chat--window--width': '100%',
    '--chat--window--height': '100%'
}

// Additional metadata sent with each message
metadata: {
    source: 'genesys-cloud-iframe',
    department: 'support',
    priority: 'normal',
    clientId: 'your-client-id'
}
```

## 🌐 Usage Methods

### Method 1: Direct URL

Access the chat directly:

```
https://yourdomain.com/chat.html
```

### Method 2: URL Parameters

Pass webhook URL via URL parameter:

```
https://yourdomain.com/chat.html?webhookUrl=https%3A//yourname.app.n8n.cloud/webhook/YOUR-WEBHOOK-ID
```

### Method 3: Iframe Embedding

Embed in Genesys Cloud or other platforms:

```html
<iframe
  src="https://yourdomain.com/chat.html"
  width="400"
  height="600"
  frameborder="0"
>
</iframe>
```

## 📱 Genesys Cloud Integration

### Iframe Communication

The chat widget communicates with Genesys Cloud through `postMessage`:

```javascript
// Events sent to Genesys Cloud
- n8nChat_chatReady: Chat is initialized and ready
- n8nChat_messageReceived: New message received
- n8nChat_messageSent: Message sent by user
- n8nChat_chatStarted: Chat session started
- n8nChat_chatEnded: Chat session ended
- n8nChat_chatError: Error occurred
```

### Receiving Events in Genesys Cloud

```javascript
window.addEventListener("message", function (event) {
  if (event.data.type === "n8nChat_chatReady") {
    console.log("Chat is ready:", event.data);
  }
});
```

## 🎨 Customization

### Styling

The chat widget can be customized using CSS variables:

```css
:root {
  --chat--color-primary: #0066cc;
  --chat--color-secondary: #28a745;
  --chat--header--background: #343a40;
  --chat--message--font-size: 0.875rem;
  /* ... more variables available */
}
```

### Branding

Update the configuration to match your brand:

```javascript
i18n: {
    en: {
        title: 'Your Company Chat',
        subtitle: 'We\'re here to help!',
        footer: 'Powered by Your Company',
        inputPlaceholder: 'Ask us anything...'
    }
}
```

## 🔍 Troubleshooting

### Common Issues

1. **"Chat Unavailable" Error**

   - Check that your webhook URL is correct
   - Ensure your n8n workflow is active
   - Verify CORS settings in your Chat Trigger node

2. **"Configuration not loaded" Error**

   - Ensure `config.js` is in the same directory as `chat.html`
   - Check browser console for JavaScript errors

3. **Chat doesn't appear**

   - Verify the iframe dimensions are adequate (min 300x400px)
   - Check browser console for errors
   - Ensure the chat container has proper height/width

4. **CORS Errors**
   - Add your domain to the Chat Trigger node's CORS settings
   - Include both HTTP and HTTPS versions if needed

### Debug Mode

Enable debug mode by adding to URL:

```
https://yourdomain.com/chat.html?debug=true
```

## 📋 n8n Workflow Requirements

Your n8n workflow should include:

1. **Chat Trigger Node** (required)

   - Configure CORS for your domain
   - Note the webhook URL

2. **AI Agent Node** (recommended)

   - For AI-powered responses
   - Connect to your preferred AI service

3. **Memory Node** (optional)

   - For conversation context
   - Maintains chat history

4. **Response Node** (required)
   - Sends responses back to chat widget

### Example Workflow Structure

```
Chat Trigger → AI Agent → [Optional: Memory] → Response
```

## 🚀 Deployment Options

### Option 1: Static Hosting

Deploy to any static hosting service:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps

### Option 2: CDN

For better performance, use a CDN:

- CloudFlare
- AWS CloudFront
- Azure CDN

### Option 3: Same Domain

Host on the same domain as your main application for optimal iframe integration.

## 🔒 Security Considerations

1. **CORS Configuration**: Only allow trusted domains in your n8n Chat Trigger
2. **HTTPS**: Always use HTTPS for production deployments
3. **Content Security Policy**: Configure appropriate CSP headers
4. **Data Privacy**: Ensure compliance with GDPR/privacy regulations

## 📚 Additional Resources

- [n8n Chat Documentation](https://www.npmjs.com/package/@n8n/chat)
- [n8n Official Documentation](https://docs.n8n.io/)
- [Genesys Cloud Developer Center](https://developer.genesys.cloud/)

## 🆘 Support

For issues related to:

- **n8n Chat Widget**: Check [n8n GitHub](https://github.com/n8n-io/n8n)
- **Genesys Cloud Integration**: Consult [Genesys Cloud Docs](https://help.mypurecloud.com/)
- **This Implementation**: Create an issue in this repository

## 📄 License

This project is provided as-is under the MIT License. The n8n chat widget is subject to its own licensing terms.
