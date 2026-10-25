@echo off
title Vision Logbook local server
cd /d %~dp0
echo This PC IP address (use it on your phone):
ipconfig | findstr /i "IPv4"
echo.
echo PC:    http://127.0.0.1:4173
echo Phone: http://YOUR-IP-ABOVE:4173  (same Wi-Fi)
echo.
"D:\nodejs\node.exe" server.js
echo.
echo Server stopped. Press any key to close.
pause
