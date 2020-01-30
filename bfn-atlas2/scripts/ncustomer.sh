#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  Customer001 "
cd build/nodes/Customer001
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
