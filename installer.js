const fs = require('fs');
const installerCode = `
@echo off
title Smart Clipboard Installer Setup
echo ====================================================
echo 📋 INSTALLING SMART CLIPBOARD ASSISTANT...
echo ====================================================
taskkill /f /im smart-clipboard-service.exe >nul 2>&1
mkdir "%APPDATA%\\SmartClipboard" >nul 2>&1
copy /Y "smart-clipboard-service.exe" "%APPDATA%\\SmartClipboard\\smart-clipboard-service.exe" >nul
copy /Y "config.json" "%APPDATA%\\SmartClipboard\\config.json" >nul
powershell -Command "$wsh = New-Object -ComObject WScript.Shell; $sc = $wsh.CreateShortcut('%USERPROFILE%\\Desktop\\My Clipboard History.lnk'); $sc.TargetPath = '%APPDATA%\\SmartClipboard\\My_Clipboard_History.txt'; $sc.Save()"
powershell -Command "$wsh = New-Object -ComObject WScript.Shell; $sc = $wsh.CreateShortcut('%APPDATA%\\Microsoft\\Windows\\Start Menu\\Programs\\Startup\\SmartClipboardService.lnk'); $sc.TargetPath = '%APPDATA%\\SmartClipboard\\smart-clipboard-service.exe'; $sc.WorkingDirectory = '%APPDATA%\\SmartClipboard'; $sc.Save()"
start "" "%APPDATA%\\SmartClipboard\\smart-clipboard-service.exe"
echo ====================================================
echo ✔️ SETUP COMPLETE! Your text log shortcut is on your Desktop.
echo ====================================================
pause
`;
fs.writeFileSync('Setup_Install.bat', installerCode);
console.log("🎯 SUCCESS: 'Setup_Install.bat' deployment bundle ready for users!");
