#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  PartyA"
cd build/nodes/PartyA
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
