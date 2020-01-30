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

# ------------ partyA NODE
echo "🕗  Sleeping for 15 seconds"
sleep 15s
echo "🔆 Woke up, 🔆 🔆 🔆  opening terminal for Anchor"
ttab ./scripts/nanchor.sh

# ------------ partyB NODE
echo "🕗 Sleeping for 15 seconds"
sleep 15s
echo "🔆 Woke up, 🔆 🔆 🔆  opening terminal for Customer"
ttab ./scripts/ncustomer.sh


echo "🔵 DONE! 🍎 🍎 corda nodes booted up! 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵 🔵"




