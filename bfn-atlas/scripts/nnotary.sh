#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  Notary"
cd build/nodes/Notary
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
