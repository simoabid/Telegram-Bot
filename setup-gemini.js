#!/usr/bin/env node

/**
 * Setup script for Gemini AI Plugin
 * Helps users configure their API key and test the connection
 */

import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log('🤖 Gemini AI Plugin Setup\n');
console.log('This script will help you configure the Gemini AI plugin for Sasuke Bot MD.\n');

// Check if .env file exists
const envFile = '.env';
const envExists = fs.existsSync(envFile);

if (envExists) {
    console.log('✅ .env file found');
} else {
    console.log('📝 Creating .env file...');
    fs.writeFileSync(envFile, '# Gemini AI Configuration\n');
}

// Function to ask for input
function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer.trim());
        });
    });
}

// Function to update .env file
function updateEnvFile(key, value) {
    try {
        let envContent = '';
        if (fs.existsSync(envFile)) {
            envContent = fs.readFileSync(envFile, 'utf8');
        }
        
        // Check if key already exists
        if (envContent.includes(`${key}=`)) {
            // Replace existing value
            envContent = envContent.replace(
                new RegExp(`${key}=.*`, 'g'),
                `${key}=${value}`
            );
        } else {
            // Add new key-value pair
            envContent += `\n${key}=${value}`;
        }
        
        fs.writeFileSync(envFile, envContent);
        return true;
    } catch (error) {
        console.error('❌ Error updating .env file:', error.message);
        return false;
    }
}

// Function to test Gemini API connection
async function testGeminiAPI(apiKey) {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: 'Hello! Please respond with "Gemini API connection successful!"' }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 50,
                }
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${errorData.error?.message || response.statusText}`);
        }
        
        const data = await response.json();
        const responseText = data.candidates[0]?.content?.parts[0]?.text || '';
        
        if (responseText.includes('successful')) {
            return { success: true, message: 'API connection successful!' };
        } else {
            return { success: false, message: 'Unexpected API response' };
        }
        
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// Main setup function
async function main() {
    try {
        // Ask for API key
        console.log('🔑 Step 1: Get your Gemini API Key');
        console.log('1. Visit: https://makersuite.google.com/app/apikey');
        console.log('2. Create a new API key');
        console.log('3. Copy the API key\n');
        
        const apiKey = await askQuestion('Enter your Gemini API key: ');
        
        if (!apiKey || apiKey.length < 10) {
            console.log('❌ Invalid API key. Please provide a valid key.');
            rl.close();
            return;
        }
        
        // Update .env file
        console.log('\n📝 Updating .env file...');
        if (updateEnvFile('GEMINI_API_KEY', apiKey)) {
            console.log('✅ API key saved to .env file');
        } else {
            console.log('❌ Failed to save API key');
            rl.close();
            return;
        }
        
        // Test API connection
        console.log('\n🧪 Step 2: Testing API Connection...');
        console.log('Testing connection to Gemini API...');
        
        const testResult = await testGeminiAPI(apiKey);
        
        if (testResult.success) {
            console.log('✅ API connection successful!');
        } else {
            console.log('❌ API connection failed:', testResult.message);
            console.log('Please check your API key and try again.');
            rl.close();
            return;
        }
        
        // Create memory directory if it doesn't exist
        const memoryDir = './db';
        if (!fs.existsSync(memoryDir)) {
            fs.mkdirSync(memoryDir, { recursive: true });
            console.log('✅ Created memory directory');
        }
        
        // Create memory file if it doesn't exist
        const memoryFile = path.join(memoryDir, 'gemini-memory.json');
        if (!fs.existsSync(memoryFile)) {
            const initialMemory = {
                users: {},
                metadata: {
                    created: new Date().toISOString(),
                    version: "1.0.0",
                    description: "Gemini AI Assistant Memory Database"
                }
            };
            fs.writeFileSync(memoryFile, JSON.stringify(initialMemory, null, 2));
            console.log('✅ Created memory database file');
        }
        
        // Final setup instructions
        console.log('\n🎉 Setup completed successfully!');
        console.log('\n📋 Next steps:');
        console.log('1. Restart your bot to load the new environment variables');
        console.log('2. Use /gemini <message> to chat with Gemini AI');
        console.log('3. Send photos with /gemini <description> for image analysis');
        console.log('4. Use /gemini memory to view conversation history');
        console.log('5. Use /gemini clear to clear conversation history');
        
        console.log('\n📁 Files created/updated:');
        console.log(`   • ${envFile} - Environment configuration`);
        console.log(`   • ${memoryFile} - Memory database`);
        console.log('   • telegram-plugins/index/gemini-ai.js - Plugin file');
        console.log('   • GEMINI-AI-README.md - Documentation');
        
        console.log('\n🔧 Troubleshooting:');
        console.log('• If you get API errors, check your API key in .env file');
        console.log('• Ensure your bot has read/write permissions to the db/ directory');
        console.log('• Check the README for detailed usage instructions');
        
    } catch (error) {
        console.error('❌ Setup failed:', error.message);
    } finally {
        rl.close();
    }
}

// Run setup
main(); 