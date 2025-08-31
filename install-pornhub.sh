#!/bin/bash

# Pornhub Bot Integration Installation Script
# This script installs all necessary Python dependencies for the Pornhub bot

echo "🔞 Pornhub Bot Integration - Installation Script"
echo "=================================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.9+ first."
    echo "   Visit: https://www.python.org/downloads/"
    exit 1
fi

# Check Python version
PYTHON_VERSION=$(python3 -c 'import sys; print(".".join(map(str, sys.version_info[:2])))')
REQUIRED_VERSION="3.9"

if [ "$(printf '%s\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" != "$REQUIRED_VERSION" ]; then
    echo "❌ Python version $PYTHON_VERSION is too old. Required: $REQUIRED_VERSION+"
    exit 1
fi

echo "✅ Python $PYTHON_VERSION detected"
echo ""

# Check if pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "❌ pip3 is not installed. Please install pip first."
    exit 1
fi

echo "✅ pip3 detected"
echo ""

# Install pornhub-api
echo "📦 Installing pornhub-api..."
pip3 install pornhub-api

if [ $? -eq 0 ]; then
    echo "✅ pornhub-api installed successfully"
else
    echo "❌ Failed to install pornhub-api"
    exit 1
fi

echo ""

# Install optional async backends
echo "📦 Installing async backends..."
pip3 install aiohttp httpx

if [ $? -eq 0 ]; then
    echo "✅ Async backends installed successfully"
else
    echo "⚠️  Warning: Failed to install some async backends"
    echo "   The bot will still work with the default requests backend"
fi

echo ""

# Test the installation
echo "🧪 Testing installation..."
python3 -c "
try:
    from pornhub_api import PornhubApi
    print('✅ pornhub-api import successful')
    
    # Test basic functionality
    api = PornhubApi()
    print('✅ PornhubApi initialization successful')
    
    print('✅ Installation test passed!')
except Exception as e:
    print(f'❌ Installation test failed: {e}')
    exit(1)
"

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Installation completed successfully!"
    echo ""
    echo "📋 Available bot commands:"
    echo "   !pornhub <query>     - Search for videos"
    echo "   !phinfo <video_id>   - Get video details"
    echo "   !phactive <video_id> - Check video status"
    echo "   !phcategories        - Browse categories"
    echo "   !phtags <letter>     - Browse tags"
    echo "   !phstars [detailed]  - Browse performers"
    echo "   !phtrending [period] - Show trending videos"
    echo "   !phhelp              - Show help"
    echo ""
    echo "💡 Start using the bot with: !phhelp"
else
    echo ""
    echo "❌ Installation test failed. Please check the error messages above."
    exit 1
fi 