#!/usr/bin/env bash
echo "Starting node for  🌸  🌸  🌸  🌸  🌸  🌸  🌸  NetworkAnchorNode"
cd build/nodes/NetworkAnchorNode
java -Dcapsule.jvm.args="-Xmx1024m" -jar corda.jar --log-to-console
