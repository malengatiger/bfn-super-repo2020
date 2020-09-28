#!/usr/bin/env bash
# ----------- DEPLOY CORDA NODES
./scripts/deploy.sh

echo "🍀 🍀 🍀 🍀 🍀 🍀 🍀 done deploying Corda nodes"
# ------------ NOTARY NODE
echo "🔆 Woke up, opening terminal for Notary Corda Node"
ttab ./scripts/nnotary.sh

# ------------ REGULATOR NODE
echo "🕗 Sleeping for 15 seconds"
sleep 15s
echo "🔆 Woke up, opening terminal for Regulator Corda Node"
ttab ./scripts/nregulator.sh

# ------------ ANCHOR NODE
echo "🕗  Sleeping for 15 seconds"
sleep 15s
echo "🔆 Woke up, 🔆 🔆 🔆  opening terminal for Anchor"
ttab ./scripts/nanchor.sh

# ------------ CUSTOMER NODE
echo "🕗 Sleeping for 15 seconds"
sleep 15s
echo "🔆 Woke up, 🔆 🔆 🔆  opening terminal for Customer"
ttab ./scripts/ncustomer.sh
echo "🕗 Sleeping for 15 seconds to let the Corda nodes finish booting up ..."
sleep 15s
echo "🔵 almost done ... 🍎 🍎 corda nodes booted up! 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵"


# ------------ API Web Servers
echo "🔆 Woke up, 🔆 🔆 🔆  starting web api servers ..... 🔵 🔵"
./scripts/apiservers.sh
echo "🔵 Waiting for web servers to finish booting up, sleeping for another 20 seconds ... 🔵 🔵 🔵 🔵 🔵 "
sleep 20s
echo "🔵 🍎 🍎 🍎 🍎 🍎 🍎 🍎 🍎 corda nodes and web servers should all be booted up by now! 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵"

# ------------ Data Generation
echo "🔆 Woke up, 🔆 🔆 🔆  starting data generation script ..... 🔵 🔵"
./scripts/demodata.sh

# ------------ API Web Servers
#echo "🦕🦕🦕🦕🦕🦕 starting the Client to perform data generation using 🥬 CordaRPCClient and 🍔 basic http 🦕🦕🦕🦕🦕🦕 ..."
#./scripts/client.sh



