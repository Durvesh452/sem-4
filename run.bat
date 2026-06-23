@echo off
title Hidden Plans Hub - Automated Installer
echo ====================================================================
echo             🔑 HIDDEN PLANS HUB - AUTOMATED RUNNER 🔑
echo ====================================================================
echo.

:: 1. Check for Node.js
echo [Step 1/3] Verifying Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ [ERROR] Node.js is not installed on this computer!
    echo.
    echo Please install Node.js first:
    echo 1. Download installer from: https://nodejs.org/
    echo 2. Run the downloaded installer (LTS version is recommended)
    echo 3. Re-run this script after installation.
    echo.
    pause
    exit /b
)
echo.

:: 2. Run npm install
echo [Step 2/3] Installing all required node packages...
echo (This may take 1-2 minutes depending on your internet connection)
echo.
call npm install
if %errorlevel% neq 0 (
    echo ❌ [ERROR] Dependency installation failed! 
    echo Please check your internet connection and try running this script again.
    echo.
    pause
    exit /b
)
echo.
echo.

:: 3. Choose Startup Mode
echo [Step 3/3] Choose Startup Mode
echo 1. Start Standard Dev Server (Frontend Only)
echo 2. Run Full Automated Setup (Local Node + Contract Deploy + Frontend Build + Start)
set /p choice="Enter your choice (1 or 2): "

if "%choice%"=="2" (
    echo.
    echo ====================================================================
    echo 🚀 Running Full Automated Setup...
    echo ====================================================================
    echo (1/3) Starting Local Hardhat Node in background...
    start cmd /k "call npm run node"
    
    :: Wait a few seconds for node to boot
    timeout /t 5 /nobreak >nul
    
    echo (2/3) Compiling and Deploying Smart Contracts...
    call npm run deploy:local
    
    echo (3/3) Building Frontend and Launching Server...
    call npm run build
    call npm run dev
) else (
    echo.
    echo ====================================================================
    echo 🚀 SUCCESS: Server is launching!
    echo 🔗 Access the application here: http://localhost:3000
    echo ====================================================================
    call npm run dev
)
pause
