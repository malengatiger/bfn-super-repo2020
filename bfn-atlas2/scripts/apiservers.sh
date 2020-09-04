#!/usr/bin/env bash

echo "🔆 🍎 🍎 Woke up, 🧩 🧩 🧩 🧩  opening Network Operator webserver"
ttab ./scripts/wanchor.sh
echo "🕗 Sleeping for 15 seconds ... "
sleep 15s

echo "🔆 🍎 🍎 Woke up, 🧩 🧩 🧩 🧩  opening Customer webserver"
ttab ./scripts/wcustomer.sh
echo "🕗 Sleeping for 15 seconds ... "
sleep 15s

echo "🔆 🍎 🍎 Woke up, 🧩 🧩 🧩 🧩 opening Regulator webserver"
ttab ./scripts/wregulator.sh
echo "🕗 Sleeping for 15 seconds to let everything settle down"
sleep 15s

echo "🍎 🍎 🍎 🍎 done deploying BFN API web servers 🍀 🍀 🍀 🔵 🔵 🍀 🍀 🍀 "



