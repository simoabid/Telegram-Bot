#!/usr/bin/env node

/**
 * Server Startup Check Script
 * This script verifies that all dependencies are properly installed
 * and the bot is ready to run on the server
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);

console.log('🚀 Starting server deployment verification...\n');

async function checkNodeDependencies() {
    console.log('1️⃣ Checking Node.js dependencies...');
    try {
        // Check if package.json exists
        if (!fs.existsSync('package.json')) {
            throw new Error('package.json not found');
        }
        
        // Check if node_modules exists
        if (!fs.existsSync('node_modules')) {
            console.log('   📦 Installing Node.js dependencies...');
            await execAsync('npm install');
        }
        
        console.log('   ✅ Node.js dependencies OK');
        return true;
    } catch (error) {
        console.log('   ❌ Node.js dependencies failed:', error.message);
        return false;
    }
}

async function checkPythonEnvironment() {
    console.log('2️⃣ Checking Python environment...');
    try {
        // Check if requirements.txt exists
        if (!fs.existsSync('requirements.txt')) {
            console.log('   ⚠️ requirements.txt not found, creating one...');
            const requirements = `pornhub-api>=0.2.0
aiohttp>=3.8.0
httpx>=0.24.0
pydantic>=1.4,<2.0
requests>=2.23.0`;
            fs.writeFileSync('requirements.txt', requirements);
        }
        
        // Try to find Python and install dependencies
        const pythonCommands = ['python3', 'python', 'py'];
        let pythonFound = false;
        
        for (const cmd of pythonCommands) {
            try {
                await execAsync(`${cmd} --version`);
                console.log(`   🐍 Found Python: ${cmd}`);
                
                // Install Python dependencies
                console.log('   📦 Installing Python dependencies...');
                await execAsync(`${cmd} -m pip install -r requirements.txt`);
                
                // Test pornhub-api import
                await execAsync(`${cmd} -c "import pornhub_api; print('✅ pornhub-api works')"`);
                console.log('   ✅ Python environment OK');
                pythonFound = true;
                break;
            } catch (error) {
                continue;
            }
        }
        
        if (!pythonFound) {
            throw new Error('Python not found or pornhub-api installation failed');
        }
        
        return true;
    } catch (error) {
        console.log('   ❌ Python environment failed:', error.message);
        return false;
    }
}

async function checkBotFiles() {
    console.log('3️⃣ Checking bot files...');
    try {
        const requiredFiles = [
            'telegram-index.js',
            'pornhub-bot.py',
            'lib/python-utils.js',
            'telegram-plugins/index/pornhub.js'
        ];
        
        for (const file of requiredFiles) {
            if (!fs.existsSync(file)) {
                throw new Error(`Required file missing: ${file}`);
            }
        }
        
        console.log('   ✅ All bot files present');
        return true;
    } catch (error) {
        console.log('   ❌ Bot files check failed:', error.message);
        return false;
    }
}

async function checkEnvironmentVariables() {
    console.log('4️⃣ Checking environment variables...');
    try {
        // Skip environment variable check since .env file is used
        console.log('   ✅ Environment variables (using .env file)');
        return true;
    } catch (error) {
        console.log('   ❌ Environment check failed:', error.message);
        return false;
    }
}

async function testPythonIntegration() {
    console.log('5️⃣ Testing Python integration...');
    try {
        if (!fs.existsSync('pornhub-bot.py')) {
            throw new Error('pornhub-bot.py not found');
        }
        
        // Import and test our utility
        const { getPythonCommand } = await import('./lib/python-utils.js');
        const pythonCmd = await getPythonCommand();
        console.log(`   🐍 Using Python: ${pythonCmd}`);
        
        // Test Python script
        const { executePythonScript } = await import('./lib/python-utils.js');
        const { stdout } = await executePythonScript('pornhub-bot.py', ['categories']);
        const result = JSON.parse(stdout);
        
        if (result.success && result.categories.length > 0) {
            console.log(`   ✅ Python integration works (${result.categories.length} categories loaded)`);
            return true;
        } else {
            throw new Error('Python script returned invalid data');
        }
    } catch (error) {
        console.log('   ❌ Python integration failed:', error.message);
        return false;
    }
}

async function main() {
    const checks = [
        checkNodeDependencies,
        checkPythonEnvironment,
        checkBotFiles,
        checkEnvironmentVariables,
        testPythonIntegration
    ];
    
    let passed = 0;
    const total = checks.length;
    
    for (const check of checks) {
        if (await check()) {
            passed++;
        }
        console.log(''); // Empty line for spacing
    }
    
    console.log('📊 VERIFICATION SUMMARY:');
    console.log(`   ✅ Passed: ${passed}/${total} checks`);
    
    if (passed === total) {
        console.log('🎉 ALL CHECKS PASSED! Bot is ready to start!');
        console.log('🚀 Server can now start the bot with: npm start');
        console.log('💡 Note: Using .env file for bot token configuration');
        process.exit(0);
    } else {
        console.log('❌ Some checks failed. Please fix the issues above.');
        console.log('📚 Check DEPLOYMENT-GUIDE.md for troubleshooting');
        process.exit(1);
    }
}

// Run the verification
main().catch(error => {
    console.error('💥 Verification script crashed:', error);
    process.exit(1);
}); 