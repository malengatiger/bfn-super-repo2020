#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  PartyC"
cd build/nodes/PartyC
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
