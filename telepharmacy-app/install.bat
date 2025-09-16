@echo off
echo Installing TelePharmacy Application Dependencies...

echo Installing backend dependencies...
cd server
npm install

echo Installing frontend dependencies...
cd ../frontend
npm install

echo.
echo Installation complete!
echo To start the application, run start.bat
echo.
echo Press any key to exit...
pause >nul