# 🤖 Gemini AI Plugin for Sasuke Bot MD

A powerful AI assistant plugin that integrates Google's Gemini AI with persistent memory and full API capabilities.

## ✨ Features

- **Persistent Memory**: Remembers conversations across sessions
- **Full Gemini API**: Supports all Gemini Pro and Pro Vision features
- **English-Only**: All processing and responses in English
- **Image Analysis**: Analyze photos and documents with Gemini Vision
- **Personalization**: Customizable AI personality and context window
- **Multi-Platform**: Works on both WhatsApp and Telegram versions
- **Memory Management**: View, clear, and manage conversation history

## 🚀 Installation

### 1. Get Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Copy the API key

### 2. Set Environment Variable

Add your Gemini API key to your environment variables:

```bash
# Linux/Mac
export GEMINI_API_KEY="your_api_key_here"

# Windows
set GEMINI_API_KEY=your_api_key_here

# Or add to your .env file
GEMINI_API_KEY=your_api_key_here
```

### 3. Install Dependencies

The plugin uses these built-in dependencies:
- `node-fetch` - For API calls
- `fs` - For file system operations
- `path` - For path handling

## 📁 File Structure

```
telegram-plugins/index/
├── gemini-ai.js          # Main plugin file
└── ...

db/
├── gemini-memory.json    # Memory database
└── ...
```

## 🎯 Usage

### Basic Commands

- **`/gemini <message>`** - Chat with Gemini AI
- **`/gemini memory`** - View conversation history
- **`/gemini clear`** - Clear conversation history
- **`/gemini personality <type>`** - Change AI personality
- **`/gemini context <number>`** - Set context window size

### Command Examples

```bash
# Basic chat
/gemini What's the weather like today?

# View memory
/gemini memory

# Clear history
/gemini clear

# Change personality
/gemini personality creative

# Set context window
/gemini context 15
```

### Personality Types

- **`helpful`** - Default, balanced responses
- **`creative`** - More imaginative and artistic
- **`professional`** - Formal and business-like
- **`friendly`** - Warm and casual
- **`humorous`** - Fun and entertaining

### Context Window

- **Range**: 5-20 conversations
- **Default**: 10 conversations
- **Memory**: Stores user + assistant messages
- **Auto-cleanup**: Removes old conversations automatically

## 🖼️ Image Analysis

The plugin supports image analysis using Gemini Pro Vision:

1. **Send a photo** with `/gemini <description>`
2. **Send image documents** (JPEG, PNG, etc.)
3. **Get detailed analysis** of image content

### Image Analysis Examples

```bash
# Analyze photo
[Send photo] /gemini What do you see in this image?

# Analyze with specific question
[Send photo] /gemini Describe the colors and mood of this image

# Document analysis
[Send image document] /gemini Extract text from this image
```

## 🧠 Memory System

### Persistent Storage

- **File**: `db/gemini-memory.json`
- **Format**: JSON with user-specific data
- **Auto-save**: After each interaction
- **Backup**: Automatic file creation

### Memory Structure

```json
{
  "users": {
    "user_id": {
      "conversations": [
        {
          "role": "user|assistant",
          "content": "message content",
          "timestamp": 1234567890
        }
      ],
      "preferences": {
        "language": "English",
        "personality": "helpful",
        "context_window": 10
      },
      "last_interaction": 1234567890
    }
  }
}
```

## ⚙️ Configuration

### Environment Variables

```bash
GEMINI_API_KEY=your_api_key_here
```

### API Endpoints

- **Text**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent`
- **Vision**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro-vision:generateContent`

### Generation Config

```javascript
generationConfig: {
    temperature: 0.7,        // Creativity (0.0-1.0)
    topK: 40,               // Top-k sampling
    topP: 0.95,             // Nucleus sampling
    maxOutputTokens: 2048,  // Max response length
}
```

### Safety Settings

- **Harassment**: Block medium and above
- **Hate Speech**: Block medium and above
- **Sexually Explicit**: Block medium and above
- **Dangerous Content**: Block medium and above

## 🔧 Customization

### Modify Personalities

Edit the `buildConversationContext` function to add custom personalities:

```javascript
// Add custom personality
if (userData.preferences.personality === 'custom') {
    systemPrompt = `You are a ${customPersonality} AI assistant...`;
}
```

### Adjust Context Window

Modify the `addToMemory` function to change memory management:

```javascript
// Increase memory retention
const maxConversations = userData.preferences.context_window * 3;
```

### Add New Commands

Extend the handler function with new features:

```javascript
if (text && text.toLowerCase().startsWith('newfeature')) {
    // Implement new feature
    return bot.sendMessage(m.chat, 'New feature response');
}
```

## 🐛 Troubleshooting

### Common Issues

1. **API Key Not Configured**
   ```
   ❌ Gemini API key not configured. Please set GEMINI_API_KEY environment variable.
   ```
   **Solution**: Set the GEMINI_API_KEY environment variable

2. **API Error**
   ```
   ❌ Gemini API error. Please try again later.
   ```
   **Solution**: Check API key validity and rate limits

3. **Rate Limit Exceeded**
   ```
   ⏳ Rate limit exceeded. Please wait a moment before trying again.
   ```
   **Solution**: Wait before making new requests

4. **Memory File Error**
   ```
   Error loading user memory: [Error details]
   ```
   **Solution**: Check file permissions and disk space

### Debug Mode

Enable debug logging by modifying the plugin:

```javascript
// Add debug logging
console.log('User ID:', userId);
console.log('Memory data:', userData);
console.log('API response:', response);
```

## 📊 Performance

### Memory Usage

- **Small**: ~1KB per user (10 conversations)
- **Medium**: ~5KB per user (50 conversations)
- **Large**: ~10KB per user (100 conversations)

### API Response Time

- **Text**: 1-3 seconds
- **Image**: 2-5 seconds
- **Complex**: 3-8 seconds

### Rate Limits

- **Free Tier**: 15 requests per minute
- **Paid Tier**: 60 requests per minute
- **Enterprise**: Custom limits

## 🔒 Security

### Data Privacy

- **Local Storage**: All data stored locally
- **No External Logging**: Conversations not sent to third parties
- **User Isolation**: Each user has separate memory
- **Secure API**: HTTPS-only communication

### Content Filtering

- **Safety Settings**: Built-in content filtering
- **Harm Prevention**: Blocks harmful content
- **User Control**: Users can clear their data

## 🚀 Future Enhancements

### Planned Features

- [ ] **Multi-language Support** (while keeping processing in English)
- [ ] **Voice Message Support** (transcription + analysis)
- [ ] **File Analysis** (PDF, DOC, etc.)
- [ ] **Conversation Export** (JSON, TXT formats)
- [ ] **Memory Analytics** (usage statistics)
- [ ] **Custom Prompts** (user-defined system messages)
- [ ] **Batch Processing** (multiple images/texts)
- [ ] **Web Search Integration** (real-time information)

### API Enhancements

- [ ] **Gemini Flash** integration
- [ ] **Gemini Ultra** support
- [ ] **Custom Models** support
- [ ] **Fine-tuning** capabilities

## 📝 License

This plugin is part of Sasuke Bot MD and follows the same license terms.

## 🤝 Contributing

To contribute to this plugin:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support with this plugin:

- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Community**: Join the bot's community channels

---

**Made with ❤️ by the Sasuke Bot MD Team** 