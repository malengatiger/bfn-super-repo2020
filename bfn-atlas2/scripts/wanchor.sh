#!/usr/bin/env bash
echo "starting web server for 🔵 🔵 🔵 🔵 Anchor 🧡 💛 💚 💙 💜 ...."
echo " 🔵 🔵 🔵 🔵 run gradle task runAnchor  🧡 ...."
./gradlew runAnchor -Pconfig.rpc.host=localhost -Pconfig.rpc.port=10006 -Pserver.port=10056 -Pusername -Ppassword

