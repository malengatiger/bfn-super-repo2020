#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  AnchorInvestor"
cd build/nodes/AnchorInvestor
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
