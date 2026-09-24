@echo off
REM ====================================================================
REM  SolveMyMedia — Daily Google Indexing Local Runner
REM ====================================================================

cd /d "%~dp0\.."
echo Starting Google Indexing Batch Submitter at %date% %time%...
node scripts\submit-google-indexing.cjs
echo Finished Google Indexing at %date% %time%.
