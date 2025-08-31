#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

console.log(chalk.cyan('🔧 Setting up Bot Testing Utility...'));

// Check if required dependencies are installed
const requiredPackages = ['chalk', 'readline'];
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

console.log(chalk.blue('📦 Checking dependencies...'));

let missingPackages = [];
for (const pkg of requiredPackages) {
    if (!dependencies[pkg]) {
        missingPackages.push(pkg);
    }
}

if (missingPackages.length > 0) {
    console.log(chalk.yellow(`⚠️  Missing packages: ${missingPackages.join(', ')}`));
    console.log(chalk.yellow('These packages are usually built-in or already installed.'));
} else {
    console.log(chalk.green('✅ All required dependencies are available'));
}

// Check if telegram-plugins directory exists
if (!fs.existsSync('./telegram-plugins/index')) {
    console.log(chalk.red('❌ telegram-plugins/index directory not found'));
    console.log(chalk.yellow('Make sure you have converted your plugins to Telegram format'));
} else {
    const pluginCount = fs.readdirSync('./telegram-plugins/index').filter(f => f.endsWith('.js')).length;
    console.log(chalk.green(`✅ Found ${pluginCount} plugin files`));
}

// Make bot-tester.js executable (on Unix systems)
if (process.platform !== 'win32') {
    try {
        fs.chmodSync('./bot-tester.js', '755');
        console.log(chalk.green('✅ Made bot-tester.js executable'));
    } catch (error) {
        console.log(chalk.yellow('⚠️  Could not make bot-tester.js executable:', error.message));
    }
}

// Create a simple run script
const runScript = `#!/bin/bash
# Bot Testing Utility Runner
echo "🤖 Starting Telegram Bot Testing Utility..."
node bot-tester.js "$@"
`;

const runScriptWindows = `@echo off
REM Bot Testing Utility Runner
echo 🤖 Starting Telegram Bot Testing Utility...
node bot-tester.js %*
`;

try {
    if (process.platform === 'win32') {
        fs.writeFileSync('./run-tester.bat', runScriptWindows);
        console.log(chalk.green('✅ Created run-tester.bat'));
    } else {
        fs.writeFileSync('./run-tester.sh', runScript);
        fs.chmodSync('./run-tester.sh', '755');
        console.log(chalk.green('✅ Created run-tester.sh'));
    }
} catch (error) {
    console.log(chalk.yellow('⚠️  Could not create run script:', error.message));
}

console.log(chalk.cyan('\n🎉 Setup completed!'));
console.log(chalk.white('\nUsage examples:'));
console.log(chalk.gray('  Interactive mode:     '), chalk.green('node bot-tester.js'));
console.log(chalk.gray('  Test all categories:  '), chalk.green('node bot-tester.js --all'));
console.log(chalk.gray('  Test specific category:'), chalk.green('node bot-tester.js --auto descargas'));
console.log(chalk.gray('  Show help:           '), chalk.green('node bot-tester.js --help'));

if (process.platform === 'win32') {
    console.log(chalk.gray('  Or use:              '), chalk.green('run-tester.bat'));
} else {
    console.log(chalk.gray('  Or use:              '), chalk.green('./run-tester.sh'));
}

console.log(chalk.cyan('\n📝 Notes:'));
console.log(chalk.yellow('• The tester will create mock environments to test your commands'));
console.log(chalk.yellow('• Results will be saved to test-results-[timestamp].json'));
console.log(chalk.yellow('• Failed tests will show detailed error information'));
console.log(chalk.yellow('• Use the interactive mode to test specific categories'));
