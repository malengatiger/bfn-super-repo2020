#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  PartyB"
cd build/nodes/PartyB
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
