@echo off
echo Starting TelePharmacy Application...

echo Starting backend server...
cd server
start "Backend Server" npm run dev

echo Starting frontend development server...
cd ../frontend
start "Frontend Server" npm run dev

echo.
echo TelePharmacy application servers are starting...
echo Frontend will be available at http://localhost:3000
echo Backend API will be available at http://localhost:5000
echo.
echo Press any key to exit...
pause >nul