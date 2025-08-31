# 🤖 Telegram Bot Testing Utility Guide

## Overview

This testing utility allows you to systematically test all commands within specific categories of your Telegram bot. It provides automated testing, error reporting, and detailed analytics to help you identify and fix issues in your bot conversion project.

## Features

- **Category-based Testing**: Test commands organized by functionality (Tools, Downloads, Games, etc.)
- **Automated Command Discovery**: Automatically finds all commands in each plugin
- **Mock Environment**: Creates safe test environments without affecting real users
- **Detailed Error Reporting**: Shows exactly which commands fail and why
- **Performance Metrics**: Tracks response times and success rates
- **AI-Readable Output**: Structured results for easy analysis
- **Progress Tracking**: Visual progress indicators and summaries

## Installation & Setup

1. **Run the setup script:**
   ```bash
   node setup-tester.js
   ```

2. **Verify your plugin structure:**
   - Ensure `telegram-plugins/index/` directory exists
   - Confirm your converted plugins are in this directory

## Usage

### Interactive Mode (Recommended)
```bash
node bot-tester.js
```

This will:
1. Show all available categories
2. Let you select which category to test
3. Display plugins and commands in that category
4. Run tests and show real-time results
5. Provide detailed error analysis

### Automated Testing

**Test all categories:**
```bash
node bot-tester.js --all
```

**Test specific category:**
```bash
node bot-tester.js --auto descargas
node bot-tester.js --auto games
node bot-tester.js --auto tools
```

**Show help:**
```bash
node bot-tester.js --help
```

### Using Run Scripts

**Windows:**
```cmd
run-tester.bat
run-tester.bat --all
run-tester.bat --auto descargas
```

**Linux/Mac:**
```bash
./run-tester.sh
./run-tester.sh --all
./run-tester.sh --auto descargas
```

## Understanding the Output

### Category Selection Menu
```
📋 Available Categories:
══════════════════════════════════════════════════
 1. DESCARGAS                 (15 plugins, 23 commands)
 2. GAMES                     (8 plugins, 12 commands)
 3. TOOLS                     (12 plugins, 18 commands)
 4. AI                        (5 plugins, 8 commands)
 ...
```

### Test Results
```
🧪 Testing plugin: descargas-ytmp3.js
  Testing command: ytmp3
    ✅ PASSED

📊 Results for category: DESCARGAS
══════════════════════════════════════════════════
  descargas-ytmp3.js              1/1 (100.0%)
  descargas-tiktok.js             0/1 (0.0%)
    ❌ tiktok: API endpoint not responding
  ────────────────────────────────────────────────
  CATEGORY TOTAL: 12/15 (80.0%)
```

### Final Summary
```
📈 FINAL TEST SUMMARY
══════════════════════════════════════════════════
Total Commands Tested: 156
Passed: 132
Failed: 24
Success Rate: 84.6%

🚨 Error Summary (24 errors):
  COMMAND_ERROR (20):
    • descargas-tiktok.js - tiktok
      API endpoint not responding
    • ai-chatgpt.js - chat
      Missing API key configuration
```

## Test Data by Category

The tester automatically provides appropriate test data for different categories:

- **Downloads/Descargas**: YouTube test URL
- **Search/Buscador**: "test search query"
- **Games/Juegos**: "piedra" (for rock-paper-scissors)
- **AI/IA**: "Hello, how are you?"
- **Tools/Herramientas**: "test input"
- **Stickers**: "test sticker"
- **Group/Grupos**: "@testuser"
- **RPG**: Empty (for daily commands)
- **NSFW**: "anime"

## Output Files

### Test Results JSON
Each test run creates a detailed JSON file: `test-results-[timestamp].json`

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "summary": {
    "total": 156,
    "passed": 132,
    "failed": 24,
    "errors": [...]
  },
  "categories": [...],
  "errors": [...]
}
```

## Common Issues & Solutions

### Plugin Loading Errors
- **Syntax errors**: Check for missing semicolons, brackets, or imports
- **Missing dependencies**: Ensure all required packages are installed
- **Path issues**: Verify plugin files are in correct directory

### Command Execution Errors
- **API failures**: Check if external APIs are accessible
- **Missing configurations**: Verify API keys and config files
- **Parameter validation**: Ensure commands handle missing/invalid inputs

### Mock Environment Limitations
- **File operations**: Some file-based commands may fail in mock environment
- **External services**: Commands requiring real Telegram API may not work
- **Database operations**: May need actual database connection

## Best Practices

1. **Start with one category**: Test small groups first to identify patterns
2. **Fix high-impact errors first**: Focus on commands used most frequently
3. **Check dependencies**: Ensure all required packages are installed
4. **Review error patterns**: Look for common issues across multiple plugins
5. **Test incrementally**: Re-test after making fixes to track progress

## Integration with Development Workflow

1. **Before deployment**: Run `--all` to get overall health check
2. **After fixes**: Test specific categories to verify improvements
3. **Regular monitoring**: Use automated testing in CI/CD pipeline
4. **Error tracking**: Keep test result files for historical analysis

## Troubleshooting

### Tester Won't Start
- Check Node.js version (requires ES modules support)
- Verify plugin directory exists
- Ensure no syntax errors in bot-tester.js

### No Plugins Found
- Confirm plugins are in `telegram-plugins/index/`
- Check file extensions (.js)
- Verify plugins export default handlers

### Tests Fail Immediately
- Check for missing global variables
- Verify mock environment setup
- Review plugin dependencies

## Advanced Usage

### Custom Test Data
Modify `getTestDataForCategory()` in bot-tester.js to provide specific test inputs for your commands.

### Extended Error Analysis
The JSON output files can be processed with additional tools for deeper analysis and reporting.

### Continuous Integration
Integrate the tester into your CI/CD pipeline:
```bash
# In your CI script
node bot-tester.js --all
if [ $? -ne 0 ]; then
  echo "Tests failed"
  exit 1
fi
```

## Support

If you encounter issues:
1. Check the error messages in the terminal output
2. Review the detailed JSON results file
3. Verify your plugin structure matches the expected format
4. Ensure all dependencies are properly installed
