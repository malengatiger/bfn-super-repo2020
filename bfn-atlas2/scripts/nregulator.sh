#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  Regulator"
cd build/nodes/Regulator
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
