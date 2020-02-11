#!/usr/bin/env bash
echo "🔆 Closing the Terminal App ...."
osascript -e 'tell application "Terminal" to close first window' & exit
