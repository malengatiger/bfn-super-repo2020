#!/usr/bin/env bash

echo "🔆 Woke up, 🧩 🧩 🧩 🧩  opening PartyA webserver"
ttab ./scripts/wpartyA.sh
sleep 15s

echo "🔆 Woke up, 🧩 🧩 🧩 🧩  opening PartyB webserver"
ttab ./scripts/wpartyB.sh
sleep 15s
#echo "🔆 Woke up, 🧩 🧩 🧩 🧩  opening PartyC webserver"
#ttab ./scripts/wpartyC.sh
#sleep 15s

echo "🔆 Woke up, 🧩 🧩 🧩 🧩 opening Regulator webserver"
ttab ./scripts/wregulator.sh
sleep 15s

echo "🍀 🍀 🍀 🍀 🍀 🍀 🍀 done deploying Corda api webservers 🍀 🍀 🍀 🍀 🍀 🍀 🍀 "



