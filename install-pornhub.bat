@echo off
chcp 65001 >nul
title Pornhub Bot Integration - Installation Script

echo 🔞 Pornhub Bot Integration - Installation Script
echo ==================================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Python is not installed or not in PATH.
    echo    Please install Python 3.9+ first.
    echo    Visit: https://www.python.org/downloads/
    pause
    exit /b 1
)

REM Check Python version
for /f "tokens=2" %%i in ('python --version 2^>^&1') do set PYTHON_VERSION=%%i
echo ✅ Python %PYTHON_VERSION% detected
echo.

REM Check if pip is installed
pip --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ pip is not installed. Please install pip first.
    pause
    exit /b 1
)

echo ✅ pip detected
echo.

REM Install pornhub-api
echo 📦 Installing pornhub-api...
pip install pornhub-api

if %errorlevel% equ 0 (
    echo ✅ pornhub-api installed successfully
) else (
    echo ❌ Failed to install pornhub-api
    pause
    exit /b 1
)

echo.

REM Install optional async backends
echo 📦 Installing async backends...
pip install aiohttp httpx

if %errorlevel% equ 0 (
    echo ✅ Async backends installed successfully
) else (
    echo ⚠️  Warning: Failed to install some async backends
    echo    The bot will still work with the default requests backend
)

echo.

REM Test the installation
echo 🧪 Testing installation...
python -c "from pornhub_api import PornhubApi; api = PornhubApi(); print('✅ Installation test passed!')"

if %errorlevel% equ 0 (
    echo.
    echo 🎉 Installation completed successfully!
    echo.
    echo 📋 Available bot commands:
    echo    !pornhub ^<query^>     - Search for videos
    echo    !phinfo ^<video_id^>   - Get video details
    echo    !phactive ^<video_id^> - Check video status
    echo    !phcategories        - Browse categories
    echo    !phtags ^<letter^>     - Browse tags
    echo    !phstars [detailed]  - Browse performers
    echo    !phtrending [period] - Show trending videos
    echo    !phhelp              - Show help
    echo.
    echo 💡 Start using the bot with: !phhelp
) else (
    echo.
    echo ❌ Installation test failed. Please check the error messages above.
)

echo.
pause 