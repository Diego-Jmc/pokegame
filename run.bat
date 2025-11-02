@echo off
echo ===============================
echo Iniciando aplicación React...
echo ===============================

echo Verificando dependencias...
call npm install

echo ===============================
echo Iniciando servidor de desarrollo...
echo ===============================

REM Ejecuta el servidor y muestra los logs en tiempo real
call npm start

echo ===============================
echo Servidor detenido.
pause
