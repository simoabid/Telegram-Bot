# 🤖 Bot Testing Utility - Quick Start

## What This Does

This utility systematically tests all your Telegram bot commands by category, helping you identify and fix issues in your converted bot plugins.

## Quick Setup

1. **Setup the tester:**
   ```bash
   node setup-tester.js
   ```

2. **Run interactive testing:**
   ```bash
   node bot-tester.js
   ```

3. **Or test all categories automatically:**
   ```bash
   node bot-tester.js --all
   ```

## Key Features

✅ **Category-based testing** - Test by functionality (Downloads, Games, Tools, etc.)  
✅ **Automatic command discovery** - Finds all commands in your plugins  
✅ **Safe mock environment** - Tests without affecting real users  
✅ **Detailed error reporting** - Shows exactly what failed and why  
✅ **AI-readable output** - Structured results for easy analysis  
✅ **Progress tracking** - Visual indicators and success rates  

## Example Output

```
📋 Available Categories:
══════════════════════════════════════════════════
 1. DESCARGAS                 (15 plugins, 23 commands)
 2. GAMES                     (8 plugins, 12 commands)
 3. TOOLS                     (12 plugins, 18 commands)
 4. AI                        (5 plugins, 8 commands)

🧪 Testing plugin: descargas-ytmp3.js
  Testing command: ytmp3
    ✅ PASSED

📊 Results for category: DESCARGAS
══════════════════════════════════════════════════
  descargas-ytmp3.js              1/1 (100.0%)
  descargas-tiktok.js             0/1 (0.0%)
    ❌ tiktok: API endpoint not responding

📈 FINAL TEST SUMMARY
══════════════════════════════════════════════════
Total Commands Tested: 156
Passed: 132
Failed: 24
Success Rate: 84.6%
```

## Usage Options

| Command | Description |
|---------|-------------|
| `node bot-tester.js` | Interactive mode - select categories manually |
| `node bot-tester.js --all` | Test all categories automatically |
| `node bot-tester.js --auto descargas` | Test specific category |
| `node bot-tester.js --help` | Show help information |

## What Gets Tested

The tester automatically provides appropriate test data for each category:

- **Downloads/Descargas**: YouTube test URLs
- **Games/Juegos**: Game inputs like "piedra" 
- **AI/IA**: Chat messages
- **Tools/Herramientas**: Test inputs
- **Search/Buscador**: Search queries
- **And more...**

## Output Files

Each test creates a detailed JSON file: `test-results-[timestamp].json` with:
- Complete test results
- Error details and stack traces
- Performance metrics
- Category breakdowns

## Perfect for Your Workflow

This tool is designed specifically for your bot conversion project to:

1. **Identify remaining issues** in your 371/434 working plugins
2. **Prioritize fixes** by showing which commands fail most
3. **Track progress** as you fix issues
4. **Provide AI-readable reports** for systematic debugging

## Next Steps

1. Run the setup: `node setup-tester.js`
2. Start with interactive mode: `node bot-tester.js`
3. Select a category to test (start with a small one)
4. Review the results and fix any errors
5. Re-test to verify your fixes
6. Use `--all` for comprehensive testing before deployment

The tool will help you systematically improve your bot's success rate beyond the current 85.5%!
