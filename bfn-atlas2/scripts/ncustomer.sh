#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  CustomerNode1 "
cd build/nodes/CustomerNode1
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
