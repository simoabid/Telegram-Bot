#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import readline from 'readline';
import chalk from 'chalk';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

class BotTester {
    constructor() {
        this.pluginFolder = './telegram-plugins/index';
        this.plugins = {};
        this.categories = {};
        this.testResults = {
            total: 0,
            passed: 0,
            failed: 0,
            errors: []
        };
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }

    // Setup global environment for plugins
    setupGlobalEnvironment() {
        // Setup minimal global environment that plugins expect
        global.db = {
            data: {
                users: {},
                chats: {},
                stats: {},
                sticker: {}
            }
        };

        global.opts = {};
        global.prefix = /^[./#!]/;
        global.prefixes = ['.', '/', '#', '!'];
        global.multiplier = 1;

        // Mock bot object for plugins that reference it during loading
        global.bot = {
            getName: (sender) => {
                if (typeof sender === 'string') {
                    // Extract name from sender ID or return a default name
                    const name = sender.split('@')[0] || 'TestUser';
                    return name.charAt(0).toUpperCase() + name.slice(1);
                }
                return 'TestUser';
            },
            fakeReply: () => {},
            reply: () => {},
            sendMessage: () => {},
            parseMention: () => []
        };

        // Other globals that plugins might reference
        global.fake = {
            key: {
                fromMe: false,
                participant: '0@s.whatsapp.net',
                remoteJid: 'status@broadcast'
            },
            message: {
                conversation: 'Test message'
            }
        };
        global.conn = global.bot;
        global.plugins = {};

        // Add getRandom method to Number, String, and Array prototypes
        if (!Number.prototype.getRandom) {
            function getRandom() {
                if (Array.isArray(this) || this instanceof String) {
                    return this[Math.floor(Math.random() * this.length)];
                }
                return Math.floor(Math.random() * this);
            }

            Number.prototype.getRandom = getRandom;
            String.prototype.getRandom = getRandom;
            Array.prototype.getRandom = getRandom;
        }
    }

    // Load all plugins and categorize them
    async loadPlugins() {
        console.log(chalk.blue('🔄 Loading plugins...'));

        // Setup global environment first
        this.setupGlobalEnvironment();

        if (!fs.existsSync(this.pluginFolder)) {
            console.error(chalk.red(`❌ Plugin folder not found: ${this.pluginFolder}`));
            return false;
        }

        const files = fs.readdirSync(this.pluginFolder).filter(file => file.endsWith('.js'));
        console.log(chalk.yellow(`📂 Found ${files.length} plugin files`));

        for (const filename of files) {
            try {
                const filePath = path.resolve(this.pluginFolder, filename);
                const fileUrl = pathToFileURL(filePath).href;
                const module = await import(fileUrl);
                const plugin = module.default || module;
                
                if (plugin && (typeof plugin === 'function' || typeof plugin === 'object')) {
                    // Check if it has the required properties (help, tags, or command)
                    if (plugin.help || plugin.tags || plugin.command) {
                        this.plugins[filename] = plugin;

                        // Categorize plugin
                        const tags = Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags || 'otros'];
                        tags.forEach(tag => {
                            if (tag) {
                                if (!this.categories[tag]) {
                                    this.categories[tag] = [];
                                }
                                this.categories[tag].push({
                                    filename,
                                    plugin,
                                    commands: this.extractCommands(plugin)
                                });
                            }
                        });

                        console.log(chalk.green(`✅ Loaded: ${filename}`));
                    } else {
                        console.log(chalk.yellow(`⚠️  Skipped: ${filename} (no command/help/tags properties)`));
                    }
                } else {
                    console.log(chalk.yellow(`⚠️  Skipped: ${filename} (no valid handler)`));
                }
            } catch (error) {
                console.error(chalk.red(`❌ Error loading ${filename}: ${error.message}`));
                this.testResults.errors.push({
                    type: 'LOAD_ERROR',
                    plugin: filename,
                    error: error.message,
                    stack: error.stack
                });
            }
        }

        console.log(chalk.blue(`🔌 Total plugins loaded: ${Object.keys(this.plugins).length}`));
        console.log(chalk.blue(`📁 Categories found: ${Object.keys(this.categories).length}`));
        return true;
    }

    // Extract commands from plugin
    extractCommands(plugin) {
        const commands = [];
        
        if (plugin.command) {
            if (typeof plugin.command === 'string') {
                commands.push(plugin.command);
            } else if (plugin.command instanceof RegExp) {
                // Extract pattern from regex for display
                const pattern = plugin.command.source;
                commands.push(`/${pattern}/i`);
            } else if (Array.isArray(plugin.command)) {
                commands.push(...plugin.command);
            }
        }
        
        if (plugin.help) {
            const helpCommands = Array.isArray(plugin.help) ? plugin.help : [plugin.help];
            helpCommands.forEach(cmd => {
                if (typeof cmd === 'string' && !commands.includes(cmd)) {
                    commands.push(cmd);
                }
            });
        }
        
        return commands;
    }

    // Display available categories
    displayCategories() {
        console.log(chalk.cyan('\n📋 Available Categories:'));
        console.log(chalk.cyan('═'.repeat(50)));
        
        const sortedCategories = Object.keys(this.categories).sort();
        sortedCategories.forEach((category, index) => {
            const pluginCount = this.categories[category].length;
            const totalCommands = this.categories[category].reduce((sum, item) => sum + item.commands.length, 0);
            
            console.log(chalk.white(`${(index + 1).toString().padStart(2)}. `) + 
                       chalk.yellow(category.toUpperCase().padEnd(20)) + 
                       chalk.gray(`(${pluginCount} plugins, ${totalCommands} commands)`));
        });
        
        console.log(chalk.cyan('═'.repeat(50)));
        console.log(chalk.white(`${sortedCategories.length + 1}. `) + chalk.red('EXIT'));
    }

    // Get user category selection
    async selectCategory() {
        return new Promise((resolve) => {
            this.rl.question(chalk.green('\n🎯 Select a category number: '), (answer) => {
                const categoryIndex = parseInt(answer) - 1;
                const categories = Object.keys(this.categories).sort();
                
                if (categoryIndex >= 0 && categoryIndex < categories.length) {
                    resolve(categories[categoryIndex]);
                } else if (parseInt(answer) === categories.length + 1) {
                    resolve('EXIT');
                } else {
                    console.log(chalk.red('❌ Invalid selection. Please try again.'));
                    resolve(this.selectCategory());
                }
            });
        });
    }

    // Display plugins in selected category
    displayCategoryPlugins(category) {
        console.log(chalk.cyan(`\n📦 Plugins in category: ${category.toUpperCase()}`));
        console.log(chalk.cyan('═'.repeat(60)));
        
        this.categories[category].forEach((item, index) => {
            console.log(chalk.white(`${(index + 1).toString().padStart(2)}. `) + 
                       chalk.yellow(item.filename.padEnd(30)) + 
                       chalk.gray(`Commands: ${item.commands.join(', ')}`));
        });
    }

    // Create mock message object for testing
    createMockMessage(command, text = '') {
        return {
            message_id: Date.now(),
            id: Date.now(),
            chat: {
                id: 'test_chat',
                type: 'private'
            },
            from: {
                id: 'test_user',
                first_name: 'Test',
                last_name: 'User',
                username: 'testuser'
            },
            text: command + (text ? ' ' + text : ''),
            sender: 'test_user@test.com',

            // Telegram-specific properties
            isGroup: false,
            isPrivate: true,
            entities: text.includes('@') ? [{
                type: 'mention',
                user: 'mentioned_user'
            }] : [],
            reply_to_message: null,

            // WhatsApp compatibility properties
            mentionedJid: text.includes('@') ? ['mentioned_user@test.com'] : [],
            quoted: null,

            // Audio/voice properties for audio effects testing
            voice: null,
            audio: null,
            reply_to_message: null
        };
    }

    // Create mock bot object for testing
    createMockBot() {
        const responses = [];

        return {
            sendMessage: async (chatId, text, options = {}) => {
                responses.push({ type: 'message', chatId, text, options });
                return { message_id: Date.now() };
            },
            sendPhoto: async (chatId, photo, options = {}) => {
                responses.push({ type: 'photo', chatId, photo, options });
                return { message_id: Date.now() };
            },
            sendVideo: async (chatId, video, options = {}) => {
                responses.push({ type: 'video', chatId, video, options });
                return { message_id: Date.now() };
            },
            sendAudio: async (chatId, audio, options = {}) => {
                responses.push({ type: 'audio', chatId, audio, options });
                return { message_id: Date.now() };
            },
            sendDocument: async (chatId, document, options = {}) => {
                responses.push({ type: 'document', chatId, document, options });
                return { message_id: Date.now() };
            },
            reply: async (chatId, text, message, options = {}) => {
                responses.push({ type: 'reply', chatId, text, message, options });
                return { message_id: Date.now() };
            },
            react: async (emoji) => {
                responses.push({ type: 'reaction', emoji });
                return true;
            },
            sendChatAction: async (chatId, action) => {
                responses.push({ type: 'action', chatId, action });
                return true;
            },
            getName: (sender) => {
                if (typeof sender === 'string') {
                    // Extract name from sender ID or return a default name
                    const name = sender.split('@')[0] || 'TestUser';
                    return name.charAt(0).toUpperCase() + name.slice(1);
                }
                return 'TestUser';
            },
            fakeReply: async (chatId, text, message, options = {}) => {
                responses.push({ type: 'fakeReply', chatId, text, message, options });
                return { message_id: Date.now() };
            },
            parseMention: (text) => {
                // Mock function to parse mentions
                const mentions = text.match(/@\w+/g) || [];
                return mentions.map(mention => mention.replace('@', '') + '@test.com');
            },
            getResponses: () => responses,
            clearResponses: () => responses.length = 0
        };
    }

    // Test a single plugin
    async testPlugin(pluginItem, testData = {}) {
        const { filename, plugin, commands } = pluginItem;
        const results = [];
        
        console.log(chalk.blue(`\n🧪 Testing plugin: ${filename}`));
        
        for (const command of commands) {
            const startTime = Date.now();
            let testResult = {
                command,
                status: 'UNKNOWN',
                duration: 0,
                error: null,
                response: null
            };
            
            try {
                // Create test environment
                const mockBot = this.createMockBot();
                const mockMessage = this.createMockMessage(command, testData.text || '');
                
                // Add mock message methods
                mockMessage.react = async (emoji) => {
                    console.log(`Mock react: ${emoji}`);
                    return mockBot.react(emoji);
                };
                mockMessage.reply = (text) => mockBot.reply(mockMessage.chat.id, text, mockMessage);
                
                // Test parameters
                const testParams = {
                    bot: mockBot,
                    usedPrefix: '.',
                    command: command.replace(/^[./#!]/, ''),
                    text: testData.text || '',
                    args: (testData.text || '').split(' '),
                    ...testData
                };
                
                console.log(chalk.gray(`  Testing command: ${command}`));
                
                // Execute plugin handler
                if (typeof plugin === 'function') {
                    await plugin(mockMessage, testParams);
                } else if (plugin.handler && typeof plugin.handler === 'function') {
                    await plugin.handler(mockMessage, testParams);
                } else if (typeof plugin === 'object' && plugin.default && typeof plugin.default === 'function') {
                    await plugin.default(mockMessage, testParams);
                } else {
                    throw new Error('No valid handler function found');
                }
                
                testResult.status = 'PASSED';
                testResult.response = mockBot.getResponses();
                console.log(chalk.green(`    ✅ PASSED`));
                
            } catch (error) {
                testResult.status = 'FAILED';
                testResult.error = {
                    message: error.message,
                    stack: error.stack
                };
                console.log(chalk.red(`    ❌ FAILED: ${error.message}`));
            }
            
            testResult.duration = Date.now() - startTime;
            results.push(testResult);
            
            this.testResults.total++;
            if (testResult.status === 'PASSED') {
                this.testResults.passed++;
            } else {
                this.testResults.failed++;
                this.testResults.errors.push({
                    type: 'COMMAND_ERROR',
                    plugin: filename,
                    command,
                    error: testResult.error
                });
            }
        }
        
        return results;
    }

    // Test all plugins in a category
    async testCategory(category) {
        console.log(chalk.cyan(`\n🚀 Starting tests for category: ${category.toUpperCase()}`));
        console.log(chalk.cyan('═'.repeat(60)));

        const categoryPlugins = this.categories[category];
        const categoryResults = [];

        // Get test data for this category
        const testData = this.getTestDataForCategory(category);

        for (const pluginItem of categoryPlugins) {
            const pluginResults = await this.testPlugin(pluginItem, testData);
            categoryResults.push({
                plugin: pluginItem.filename,
                results: pluginResults
            });

            // Small delay between tests
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        this.displayCategoryResults(category, categoryResults);
        return categoryResults;
    }

    // Get appropriate test data for different categories
    getTestDataForCategory(category) {
        const testDataMap = {
            'descargas': {
                text: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },
            'downloads': {
                text: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            },
            'search': {
                text: 'test search query'
            },
            'buscador': {
                text: 'test search query'
            },
            'tools': {
                text: 'test input'
            },
            'herramientas': {
                text: 'test input'
            },
            'sticker': {
                text: 'test sticker'
            },
            'game': {
                text: 'piedra'
            },
            'games': {
                text: 'piedra'
            },
            'juegos': {
                text: 'piedra'
            },
            'ai': {
                text: 'Hello, how are you?'
            },
            'ia': {
                text: 'Hola, ¿cómo estás?'
            },
            'rpg': {
                text: ''
            },
            'fun': {
                text: ''
            },
            'diversión': {
                text: ''
            },
            'group': {
                text: '@testuser'
            },
            'grupos': {
                text: '@testuser'
            },
            'nsfw': {
                text: 'anime'
            }
        };

        return testDataMap[category.toLowerCase()] || { text: 'test' };
    }

    // Display results for a category
    displayCategoryResults(category, results) {
        console.log(chalk.cyan(`\n📊 Results for category: ${category.toUpperCase()}`));
        console.log(chalk.cyan('═'.repeat(60)));

        let categoryPassed = 0;
        let categoryFailed = 0;
        let categoryTotal = 0;

        results.forEach(({ plugin, results: pluginResults }) => {
            const passed = pluginResults.filter(r => r.status === 'PASSED').length;
            const failed = pluginResults.filter(r => r.status === 'FAILED').length;
            const total = pluginResults.length;

            categoryPassed += passed;
            categoryFailed += failed;
            categoryTotal += total;

            const successRate = total > 0 ? ((passed / total) * 100).toFixed(1) : '0.0';
            const statusColor = passed === total ? chalk.green : failed === total ? chalk.red : chalk.yellow;

            console.log(statusColor(`  ${plugin.padEnd(35)} ${passed}/${total} (${successRate}%)`));

            // Show failed commands
            const failedCommands = pluginResults.filter(r => r.status === 'FAILED');
            if (failedCommands.length > 0) {
                failedCommands.forEach(cmd => {
                    console.log(chalk.red(`    ❌ ${cmd.command}: ${cmd.error?.message || 'Unknown error'}`));
                });
            }
        });

        const overallSuccessRate = categoryTotal > 0 ? ((categoryPassed / categoryTotal) * 100).toFixed(1) : '0.0';
        console.log(chalk.cyan('─'.repeat(60)));
        console.log(chalk.white(`  CATEGORY TOTAL: ${categoryPassed}/${categoryTotal} (${overallSuccessRate}%)`));
    }

    // Display final summary
    displayFinalSummary() {
        console.log(chalk.cyan('\n📈 FINAL TEST SUMMARY'));
        console.log(chalk.cyan('═'.repeat(50)));

        const successRate = this.testResults.total > 0 ?
            ((this.testResults.passed / this.testResults.total) * 100).toFixed(1) : '0.0';

        console.log(chalk.white(`Total Commands Tested: ${this.testResults.total}`));
        console.log(chalk.green(`Passed: ${this.testResults.passed}`));
        console.log(chalk.red(`Failed: ${this.testResults.failed}`));
        console.log(chalk.yellow(`Success Rate: ${successRate}%`));

        if (this.testResults.errors.length > 0) {
            console.log(chalk.red(`\n🚨 Error Summary (${this.testResults.errors.length} errors):`));

            // Group errors by type
            const errorsByType = {};
            this.testResults.errors.forEach(error => {
                if (!errorsByType[error.type]) {
                    errorsByType[error.type] = [];
                }
                errorsByType[error.type].push(error);
            });

            Object.entries(errorsByType).forEach(([type, errors]) => {
                console.log(chalk.red(`\n  ${type} (${errors.length}):`));
                errors.forEach(error => {
                    console.log(chalk.gray(`    • ${error.plugin}${error.command ? ` - ${error.command}` : ''}`));
                    console.log(chalk.gray(`      ${error.error?.message || error.error}`));
                });
            });
        }

        // Recommendations
        console.log(chalk.cyan('\n💡 RECOMMENDATIONS:'));
        if (this.testResults.failed > 0) {
            console.log(chalk.yellow('  • Focus on fixing the failed commands listed above'));
            console.log(chalk.yellow('  • Check for missing dependencies or API issues'));
            console.log(chalk.yellow('  • Verify command syntax and parameter handling'));
        }
        if (successRate < 90) {
            console.log(chalk.yellow('  • Consider reviewing plugin error handling'));
            console.log(chalk.yellow('  • Add more robust input validation'));
        }
        if (successRate >= 90) {
            console.log(chalk.green('  • Great job! Your bot has excellent command coverage'));
        }
    }

    // Save detailed results to file
    async saveResultsToFile() {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const filename = `test-results-${timestamp}.json`;

        const detailedResults = {
            timestamp: new Date().toISOString(),
            summary: this.testResults,
            categories: Object.keys(this.categories).map(category => ({
                name: category,
                pluginCount: this.categories[category].length,
                plugins: this.categories[category].map(item => ({
                    filename: item.filename,
                    commands: item.commands
                }))
            })),
            errors: this.testResults.errors
        };

        try {
            fs.writeFileSync(filename, JSON.stringify(detailedResults, null, 2));
            console.log(chalk.green(`\n💾 Detailed results saved to: ${filename}`));
        } catch (error) {
            console.error(chalk.red(`❌ Failed to save results: ${error.message}`));
        }
    }

    // Main interactive loop
    async run() {
        console.log(chalk.cyan('🤖 Telegram Bot Testing Utility'));
        console.log(chalk.cyan('═'.repeat(40)));

        // Load plugins
        const loaded = await this.loadPlugins();
        if (!loaded) {
            console.log(chalk.red('❌ Failed to load plugins. Exiting.'));
            this.rl.close();
            return;
        }

        while (true) {
            this.displayCategories();
            const selectedCategory = await this.selectCategory();

            if (selectedCategory === 'EXIT') {
                break;
            }

            this.displayCategoryPlugins(selectedCategory);

            // Ask if user wants to test this category
            const shouldTest = await new Promise((resolve) => {
                this.rl.question(chalk.green('\n🧪 Test this category? (y/n): '), (answer) => {
                    resolve(answer.toLowerCase().startsWith('y'));
                });
            });

            if (shouldTest) {
                await this.testCategory(selectedCategory);

                // Ask if user wants to continue
                const shouldContinue = await new Promise((resolve) => {
                    this.rl.question(chalk.green('\n➡️  Test another category? (y/n): '), (answer) => {
                        resolve(answer.toLowerCase().startsWith('y'));
                    });
                });

                if (!shouldContinue) {
                    break;
                }
            }
        }

        // Display final summary and save results
        this.displayFinalSummary();
        await this.saveResultsToFile();

        console.log(chalk.cyan('\n👋 Testing completed. Goodbye!'));
        this.rl.close();
    }
}

// CLI entry point
async function main() {
    const tester = new BotTester();
    await tester.run();
}

// Handle CLI arguments
if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`
🤖 Telegram Bot Testing Utility

Usage: node bot-tester.js [options]

Options:
  --help, -h     Show this help message
  --auto [cat]   Run automated tests for specific category
  --all          Test all categories automatically

Examples:
  node bot-tester.js                    # Interactive mode
  node bot-tester.js --auto descargas   # Test only 'descargas' category
  node bot-tester.js --all              # Test all categories
`);
    process.exit(0);
}

if (process.argv.includes('--all')) {
    // Auto-test all categories
    const tester = new BotTester();
    await tester.loadPlugins();

    for (const category of Object.keys(tester.categories)) {
        await tester.testCategory(category);
    }

    tester.displayFinalSummary();
    await tester.saveResultsToFile();
    process.exit(0);
}

const autoIndex = process.argv.findIndex(arg => arg === '--auto');
if (autoIndex !== -1 && process.argv[autoIndex + 1]) {
    // Auto-test specific category
    const category = process.argv[autoIndex + 1];
    const tester = new BotTester();
    await tester.loadPlugins();

    if (tester.categories[category]) {
        await tester.testCategory(category);
        tester.displayFinalSummary();
        await tester.saveResultsToFile();
    } else {
        console.error(chalk.red(`❌ Category '${category}' not found`));
        console.log(chalk.yellow('Available categories:'), Object.keys(tester.categories).join(', '));
    }
    process.exit(0);
}

// Run interactive mode by default
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    main().catch(console.error);
}
