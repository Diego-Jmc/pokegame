@echo off
echo ================================
echo Ejecutando unit tests con Jest
echo ================================
echo.

REM Ejecuta los tests y mantiene la ventana abierta
cmd /k "npm test -- --watchAll=false"

echo.
echo ================================
echo Pruebas finalizadas
echo ================================
pause
