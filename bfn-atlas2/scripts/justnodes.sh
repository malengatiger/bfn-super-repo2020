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

echo "🔵 almost done ... 🍎 🍎 corda nodes booted up! 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵"


# ------------ API Web Servers
echo "🕗 Sleeping for 15 seconds to let the Corda nodes finish booting up ..."
sleep 15s
echo "🔆 Woke up, 🔆 🔆 🔆  starting web servers ..... 🔵 🔵"
ttab ./scripts/apiservers.sh
echo "🔵 🍎 🍎 READY TO RUMBLE IN THE JUNGLE!! 🍎 🍎 will start data generation ... 🔵 🔵 🔵 🔵 🔵 "



