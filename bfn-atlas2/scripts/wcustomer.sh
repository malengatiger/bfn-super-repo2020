#!/usr/bin/env bash
echo "starting webserver for 🔵 🔵 🔵 🔵 CustomerNode1  🧡 💛 💚 💙 💜 ...."
echo " 🔵 🔵 🔵 🔵 run gradle task bootRunDevCustomerNode1  🧡 ...."
echo " 🔵 🔵 🔵 🔵 run gradle task runCustomer  💜 ...."
./gradlew runCustomer -Pconfig.rpc.host=localhost -Pconfig.rpc.port=10009 -Pserver.port=10058
